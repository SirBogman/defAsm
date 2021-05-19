#!/usr/bin/env node

import fs from "fs";
import child_process from "child_process";
import { compileAsm, baseAddr } from "./compiler.js";


let args = process.argv.slice(2);
let code = undefined;
let sizeOutFD = null;
let execute = false;
let outputFile = null, inputFile = null;
let runtimeArgs = [];

if(args[0] === '-h' || args[0] === '--help')
{
    console.log(
`Usage: defasm [file] [--output outfile] [--size-out=fd] [--run [arguments...]]
    --output        The path to the output file (defaults to 'a' in current
                    directory, or /tmp/asm if --run is provided).
    --size-out      A file descriptor to write the number (in ASCII) of bytes
                    generated by the assembler to.
    --run           If given, the program will assemble the code, then
                    immediately execute it. All parameters following this flag
                    are sent to the program as runtime arguments.`
    );
    process.exit();
}

try
{
    while(args.length > 0)
    {
        let arg = args.shift();
        if(arg[0] !== '-')
        {
            inputFile = arg;
            continue;
        }

        if(arg.startsWith('--size-out='))
        {
            sizeOutFD = parseInt(arg.slice('--size-out='.length));
            if(isNaN(sizeOutFD)) throw "--size-out expects a file descriptor";
        }
        else if(arg === '-r' || arg === '--run')
        {
            execute = true;
            runtimeArgs = args;
            args = [];
        }
        else if(arg === '-o' || arg === '--output')
        {
            outputFile = args.shift();
            if(outputFile === undefined) throw "No output file given";
        }
        else
        {
            throw "Unknown flag " + arg;
        }
    }

    if(outputFile === null) outputFile = execute ? '/tmp/asm' : 'a';

    if(inputFile === null)
    {
        code = "";
        process.stdin.on("data", x => code += x.toString());
        process.stdin.on("end", assemble);
    }
    else
    {
        try { code = fs.readFileSync(inputFile).toString(); }
        catch(e) { throw "Couldn't read file " + inputFile; }
        assemble();
    }
}
catch(e)
{
    console.error(e);
    process.exit(1);
}

function writeSize(size)
{
    if(sizeOutFD !== null)
    {
        fs.write(sizeOutFD, size + '\n', err => err && console.warn("Failed writing to size-out"));
        fs.close(sizeOutFD, err => err && console.warn("Failed closing size-out"));
    }
}

function assemble()
{
    // Ensure the output path is correct
    if(outputFile[0] !== '/' && outputFile[0] !== '.')
    {
        outputFile = './' + outputFile;
    }

    let instrLines, bytes = 0;

    try
    {
        let results = compileAsm(code, [], { haltOnError: true });
        bytes = results.bytes;
        writeSize(bytes);
        instrLines = results.instructions;
    }
    catch(e)
    {
        writeSize(0);
        console.error(e);
        process.exit();
    }
    let outputStream = fs.createWriteStream(outputFile, {mode: 0o0755});


    // Construct the ELF header
    let elfHeader = Buffer.from([
        127,69, 76, 70, 2,  1,  1,  0,        0,  0,  0,  0,  0,  0,  0,  0,
        2,  0,  62, 0,  1,  0,  0,  0,        0,  0,  0,  0,  0,  0,  0,  0,
        64, 0,  0,  0,  0,  0,  0,  0,        0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  64, 0, 56,  0,        1,  0,  0,  0,  0,  0,  0,  0,
        1,  0,  0,  0,  7,  0,  0,  0,        0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,        0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,        0,  0,  0,  0,  0,  0,  0,  0,
        0,  16, 0,  0,  0,  0,  0,  0
    ]);

    elfHeader.writeBigUInt64LE(BigInt(baseAddr), 0x18);
    elfHeader.writeBigUInt64LE(BigInt(baseAddr - 0x78), 0x50);
    elfHeader.writeBigUInt64LE(BigInt(baseAddr - 0x78), 0x58);
    let size = BigInt(bytes + 0x78);
    elfHeader.writeBigInt64LE(size, 0x60); elfHeader.writeBigInt64LE(size, 0x68); // Write the size twice
    outputStream.write(elfHeader);


    // Write the code
    for(let line of instrLines)
    {
        for(let instr of line)
            outputStream.write(instr.bytes.slice(0, instr.length));
    }


    outputStream.on('close', () => {
        if(!execute) process.exit();
        let proc = child_process.execFile(outputFile, runtimeArgs);
        process.stdin.pipe(proc.stdin);
        proc.stderr.pipe(process.stderr);
        proc.stdout.pipe(process.stdout);

        proc.on('close', (code, signal) => {
            if(!signal)
                process.exit(code);
            
            let errLine = null;
            let pos = "on";
            let registers = null;

            try
            {
                let coreDumpLocation = child_process.execFileSync("/sbin/sysctl", ["-n", "kernel.core_pattern"]).toString().trim();
                if(coreDumpLocation[0] === '|' || coreDumpLocation.includes('%')) throw "";
                let data = fs.readFileSync(coreDumpLocation);
                let lastIP = null;
                
                let e_phoff = Number(data.readBigInt64LE(0x20));
                let e_phentsize = data.readInt16LE(0x36);

                for(let e_phnum = data.readInt16LE(0x38); e_phnum--; e_phoff += e_phentsize)
                {
                    if(data.readInt32LE(e_phoff) != 4) continue;
                    
                    let p_offset = Number(data.readBigInt64LE(e_phoff + 8));
                    let pt_regs = 124 + p_offset + Math.ceil(data.readInt32LE(p_offset) / 4) * 4;
                    registers = {};

                    // Order taken from https://elixir.bootlin.com/linux/latest/source/arch/x86/include/asm/ptrace.h#L56
                    for(let regName of "r15 r14 r13 r12 rbp rbx r11 r10 r9 r8 rax rcx rdx rsi rdi orig_rax rip cs rflags rsp ss".split(' '))
                    {
                        registers[regName] = data.readBigUInt64LE(pt_regs);
                        pt_regs += 8;
                    }
                    lastIP = Number(registers['rip']);
                    break;
                }

                if(lastIP !== null)
                {
                    lastIP -= baseAddr;
                    if(lastIP < 0) throw "";

                    if(signal == "SIGTRAP" || signal == "SIGSYS") lastIP--; // Weird behavior with breakpoints

                    for(errLine = 0; errLine < instrLines.length && lastIP >= 0; errLine++)
                        instrLines[errLine].map(instr => lastIP -= instr.length);
                    if(lastIP >= 0) pos = 'after';
                }
            }
            catch(e) {}

            
            signal = ({
                SIGFPE:  'floating point error',
                SIGILL:  'illegal instruction',
                SIGSEGV: 'segmentation violation',
                SIGBUS:  'bus error',
                SIGABRT: 'abort',
                SIGTRAP: 'breakpoint trap',
                SIGEMT:  'emulator trap',
                SIGSYS:  'bad system call'
            })[signal] || signal;
            console.warn(`Signal: ${signal}${
                errLine !== null ? ` ${pos} line ${errLine}` : ''
            } ${
                registers && registers['rip'] !== undefined ? `(%rip was ${registers['rip'].toString(16).toUpperCase().padStart(16, '0')})` : ''
            }`);
            
            if(registers !== null)
            {
                console.warn("Register dump:");
                let regFormat = reg => `    %${reg.padEnd(4, ' ')}= ${registers[reg].toString(16).toUpperCase().padStart(16, '0')}`;
                for(let regNames of "rax r8|rbx r9|rcx r10|rdx r11|rsi r12|rdi r13|rsp r14|rbp r15".split('|'))
                {
                    let [reg1, reg2] = regNames.split(' ');
                    console.warn(regFormat(reg1) + regFormat(reg2));
                }
            }

            process.exit();
        });
    });

    outputStream.close();
}