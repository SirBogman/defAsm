# DefAssembler - Core
This package holds the core of [DefAssembler](https://github.com/NewDefectus/defAsm#readme), an incremental x86-64 assembler, for use both in browsers and as a Node.js package.

DefAssembler is built from scratch without the use of any additional libraries, making it relatively lightweight and fast. For a quick demonstration, I recommend checking out the [GitHub Pages site](http://newdefectus.github.io/defAsm) showcasing the [@defasm/codemirror](https://www.npmjs.com/package/@defasm/codemirror) package, which utilizes this assembler. Alternatively, you can try it out with the [Code Golf editor](https://code.golf/ng/fizz-buzz#assembly), where you can also run your programs and submit them to the site.

# JavaScript types
## `AssemblyState`
This is the primary export of the assembler; an object of this type is needed to run it. Its constructor takes in an optional config object, which can be used to set the initial parsing syntax to Intel or AT&T (defaults to AT&T) and whether or not the .text section is writable.

The class has the following properties:
* `compiledRange` - the range of text parsed by the compiler during the last call to `compile` (used for debugging)
* `errors` - a list of all errors generated by the program (updated by `secondPass`)
* `head` - a [statement list](#statementnode) containing all the instructions of the program
* `sections` - a list of [`Section`](#section)s that appear in the program
* `source` - the source code of the program
* `symbols` - a map from a symbol name to the symbol's definition (if it exists) and its references

`AssemblyState` has 6 methods:
* `compile()` - usually assembles a given string of source code and discards the previous state; however, it can also be configured to replace parts of the code and update the state appropriately. This is done by passing a [`Range`](#range) object to the configuration parameter. The assembler aims to perform as few recompilations as possible, so you can rest assured this function is quite efficient.
* `secondPass()` - performs a second pass on the state, resolving symbol references and reporting errors. You typically won't need to use this (it's called automatically after `compile` unless configured otherwise with `doSecondPass`); it's available in case you wish to make multiple changes at once before executing the second pass, which is more efficient.
* `line()` - creates a `Range` object that spans a given line (useful for replacing/inserting lines in `compile`)
* `iterate()` - iterates over the instructions using a given callback, passing the instruction's line as a second parameter (for instructions that span multiple lines, this will be their first line).
* `bytesPerLine()` - iterate over each line in the program using a given callback, sending a line number and a `Uint8Array`. Data directives spanning multiple lines may be sent multiple times. Empty instructions and lines are skipped.

## `Section`
An object corresponding to an [ELF](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format) section. Its properties include:
* `head` - a [statement list](statementnode) containing all the instructions belonging to the section
* `name` - the name of the section (`.text`, `.data`, `.bss`, etc.)
* `entryPoints` - a list of all the `.section` directives that refer to this section
* `type`, `flags`, `entrySize` - numbers that are relevant to ELF file generation

## `StatementNode`
`StatementNode` objects form linked lists that hold statements (instructions, directives, comments, etc.). A list usually begins with a dummy node.

`StatementNode`s have the following functions:
* `find()` - given an index in the source code, find the `StatementNode` in the list whose statement's range encompasses that index.
* `length()` - calculate the total number of bytes of instructions in the list
* `dump()` - generate a `Buffer` (or `Uint8Array`, depending on which is available) containing all the bytes of the instructions in the list

## `Range`
`Range` objects are used within the compiler to keep track of each instruction's span. A `Range` object may be passed to the `compile` method of `AssemblyState` to specify the range in the code to replace. It can be created using the constructor, which receives the range's start index and length in characters, or using `AssemblyState`'s `line` method described above.

There are also a number of functions exported by the package that identify or collect information about assembly keywords. These are mostly there for syntax highlighting.

## Example

The following Node.js script illustrates the assembler's basic capabilities:
```js
import("@defasm/core").then(core => {
    const { AssemblyState } = core;
    let state = new AssemblyState();


    /* Compile just the "nop" instruction */
    state.compile('nop');
    console.log(state.head.dump()); // <Buffer 90>


    /* Insert a "mov $4, %ax" instruction on line 4 */
    state.compile('mov $4, %ax', { range: state.line(4) });
    console.log(state.head.dump()); // <Buffer 90 66 b8 04 00>


    /* Insert "jmp lab" on line 3. Note that "lab" is not defined yet, so this
    instruction will contain a "null" value */
    state.compile('jmp lab', { range: state.line(3) });
    console.log(state.head.dump()); // <Buffer 90 e9 00 00 00 00 66 b8 04 00>


    /* Define "lab" as a label on line 2. This will cause the aforementioned
    "jmp lab" instruction to recompile, now that the "lab" symbol has been defined */
    state.compile('lab:', { range: state.line(2) });
    console.log(state.head.dump()); // <Buffer 90 eb fe 66 b8 04 00>


    /* Replace lines 1-4 with "sub $lab, %dl". Note that among the
    deleted instructions was the definition of "lab"; now that it has been removed,
    the symbol is once again undefined, so this instruction will have a "null" value */
    state.compile('sub $lab, %dl', { range: state.line(1).until(state.line(4)) });
    console.log(state.head.dump()); // <Buffer 80 ea 00>


    /* Redefining the symbol will prompt the previous instruction to recompile */
    state.compile('lab = 27', { range: state.line(2) });
    console.log(state.head.dump()); // <Buffer 80 ea 1b>


    /* Replace the previous code with this code, which assembles some data
    into different sections */
    state.compile(
    `.data
       .ascii "Hello, world!"
     .bss
       .long 0, 0
     .text
       push %rax
       pop %rsi
     .section custom, "wax", @progbits
       jmp . + 4
    `, { range: state.line(1).until(state.line(2)) });

    /* Take a look at the data generated by each of the sections */
    for(const section of state.sections)
        console.log(`${section.name}:`, section.head.dump());
    // .text: <Buffer 50 5e>
    // .data: <Buffer 48 65 6c 6c 6f 2c 20 77 6f 72 6c 64 21>
    // .bss: <Buffer 00 00 00 00 00 00 00 00>
    // custom: <Buffer eb 02>


    /* Removing the third line, which contains the .bss directive, will cause
    the data in the .bss section to be moved over to the .data section */
    state.compile('', { range: state.line(3) });
    for(const section of state.sections)
        console.log(`${section.name}:`, section.head.dump());
    // .text: <Buffer 50 5e>
    // .data: <Buffer 48 65 6c 6c 6f 2c 20 77 6f 72 6c 64 21 00 00 00 00 00 00 00 00>
    // .bss: <Buffer >
    // custom: <Buffer eb 02>

    process.exit();
});
```