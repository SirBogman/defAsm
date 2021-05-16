import { token, next, ungetToken, ParserError } from "./parser.js";
import { parseExpression, evaluate, unescapeString } from "./shuntingYard.js";

// A directive is like a simpler instruction, except while an instruction is limited to
// 15 bytes, a directive is infinitely flexible in size.

const DIRECTIVE_BUFFER_SIZE = 15;
const encoder = new TextEncoder();

export const dirs = {
    byte:   1,
    short:  2,
    word:   2, // .word = .short
    hword:  2, // .hword = .short
    int:    3,
    long:   3, // .long = .int
    quad:   4,
    octa:   5,
    float:  6,
    single: 6, // .single = .float
    double: 7,
    asciz:  8,
    ascii:  9,
    string: 9 // .string = .ascii
}

export function Directive(dir)
{
    this.bytes = new Uint8Array(DIRECTIVE_BUFFER_SIZE);
    this.length = 0;
    this.outline = null;
    this.floatPrec = 0;

    let appendNullByte = 0;

    try
    {
        if(!dirs.hasOwnProperty(dir)) throw new ParserError("Unknown directive");
        switch(dirs[dir])
        {
            case dirs.byte:     this.compileValues(1); break;
            case dirs.word:     this.compileValues(2); break;
            case dirs.int:      this.compileValues(4); break;
            case dirs.quad:     this.compileValues(8); break;
            case dirs.octa:     this.compileValues(16); break;


            case dirs.float:    this.floatPrec = 1; this.compileValues(4); break;
            case dirs.double:   this.floatPrec = 2; this.compileValues(8); break;

            case dirs.asciz:
                appendNullByte = 1;
            case dirs.ascii:
                let strBytes, temp;
                this.bytes = new Uint8Array();
                do
                {
                    if(next().length > 1 && token[0] === '"' && token[token.length - 1] === '"')
                    {
                        strBytes = encoder.encode(unescapeString(token));
                        temp = new Uint8Array(this.length + strBytes.length + appendNullByte);
                        temp.set(this.bytes);
                        temp.set(strBytes, this.length);
                        this.bytes = temp;
                        this.length = temp.length;
                    }
                    else throw new ParserError("Expected string");
                } while(next() === ',');
                break;
        }
    }
    catch(e)
    {
        if(this.length === 0) throw e; // Only propagate the exception if the directive is empty
    }
}

Directive.prototype.compileValues = function(valSize)
{
    this.valSize = valSize;
    let value, expression, needsRecompilation = false;
    this.outline = [];
    try {
        do
        {
            expression = parseExpression(this.floatPrec);
            value = evaluate(expression, null, 0);
            if(expression.hasLabelDependency)
                needsRecompilation = true;

            this.outline.push({value: value, expression: expression});
            this.genValue(value);
        } while(token === ',');
    }
    finally
    {
        if(!needsRecompilation) this.outline = null;
    }
}

Directive.prototype.resolveLabels = function(labels)
{
    let initialLength = this.length, op, index = this.address - initialLength;
    this.length = 0;

    for(let i = 0; i < this.outline.length; i++)
    {
        op = this.outline[i];
        try
        {
            if(op.expression.hasLabelDependency)
                op.value = evaluate(op.expression, labels, index + i * this.valSize);
            this.genValue(op.value);
        }
        catch(e)
        {
            this.error = e;
            if(i === 0)
                return {
                    success: false,
                    error: this.error
                };
            this.outline = this.outline.slice(0, i);
            i = -1;
            this.length = 0;
        }
    }
    return {
        success: true,
        length: this.length - initialLength
    };
}

Directive.prototype.genValue = function(value)
{
    for(let i = 0; i < this.valSize; i++)
    {
        this.bytes[this.length++] = Number(value & 0xffn);
        value >>= 8n;

        // Resize the array if necessary
        if(this.length === this.bytes.length)
        {
            let temp = new Uint8Array(this.bytes.length + DIRECTIVE_BUFFER_SIZE);
            temp.set(this.bytes);
            this.bytes = temp;
        }
    }
}