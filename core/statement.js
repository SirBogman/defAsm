import { baseAddr } from "./compiler.js";
import { ASMError, Range, defaultSyntax } from "./parser.js";

var totalStatements = 0;

export class Statement
{
    /**
     * @param {Statement} prev
     * @param {Number} maxSize 
     * @param {Range} range
     * @param {ASMError} error */
    constructor(prev = null, maxSize = 0, range = new Range(), error = null)
    {
        this.error = error;
        this.range = range;
        this.id = totalStatements++; // Each Statement gets a unique ID

        /* effectiveRange is the range that the instruction affects.
        It may differ from range if the instruction causes parser changes
        to other instructions (e.g. syntax changes) */
        this.effectiveRange = range;

        /** @type {Number} */
        this.length = 0;

        /** @type {Uint8Array} */
        this.bytes = new Uint8Array(maxSize);

        /** @type {Statement?} */
        this.next = null;

        if(prev)
        {
            prev.next = this;
            this.syntax = prev.syntax;

            /** @type {Number} */
            this.address = prev.address + prev.length;
        }
        else
        {
            this.syntax = defaultSyntax;
            this.address = baseAddr;
        }
    }

    /**
     * @param {Number} pos
     * @returns {Statement?} */
    find(pos)
    {
        if(this.range.includes(pos))
            return this;
        return this.next?.find(pos);
    }

    remove()
    {
        this.removed = true;
    }
}

export class Comment extends Statement
{
    constructor(prev, range)
    {
        super(prev, 0, range);
    }
}