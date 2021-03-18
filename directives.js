// A directive is like a simpler instruction, except while an instruction is limited to
// 15 bytes, a directive is infinitely flexible in size.

function Directive()
{
    this.bytes = new Uint8Array(MAX_INSTR_SIZE);
    this.length = 0;
}

Directive.prototype.genByte = function(byte)
{
    this.bytes[this.length++] = Number(byte & 0xffn);

    // Resize the array if necessary
    if(this.length == this.bytes.length)
    {
        let temp = new Uint8Array(this.bytes.length + MAX_INSTR_SIZE);
        temp.set(this.bytes);
        this.bytes = temp;
    }
}

const directives = {
byte: result => {
    do { result.genByte(parseImmediate()) } while(token === ',');
},
string: result => {
    if(next().length > 1 && token[0] === '"' && token[token.length - 1] === '"')
    {
        result.bytes = encoder.encode(eval(token));
        result.length = result.bytes.length;
    }
    else throw "Expected string";
    if(next() != ';' && token != '\n') throw "Expected end of line";
}
}


function parseDirective()
{
    let result = new Directive();
    token = token.slice(1); // Drop the .
    if(directives.hasOwnProperty(token))
    {
        try
        {
            directives[token](result);
        }
        catch(e)
        {
            if(result.length == 0)
                throw e;
            console.warn(e);
        }
    }
    return result;
}