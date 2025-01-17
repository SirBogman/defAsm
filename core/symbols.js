import { Expression, CurrentIP, IdentifierValue } from "./shuntingYard.js";
import { ASMError, next, token } from "./parser.js";
import { Statement, StatementNode } from "./statement.js";
import { pseudoSections } from "./sections.js";
import { SYM_BINDS, SYM_TYPES } from "./directives.js";

/** @type {StatementNode[]} */
export var recompQueue = [];

/**
 * @typedef {Object} Symbol
 * @property {SymbolDefinition?} statement The statement defining this symbol, if it exists
 * @property {string} name The symbol's name
 * @property {Statement[]} references List of instructions that reference this symbol
 * @property {Statement[]} definitions List of instructions that define or give attributes to this symbol
 * @property {Symbol[]} uses List of symbols used in this symbol's definition
 * @property {number?} type The type field of the symbol in the ELF file
 * @property {number?} bind The bind field of the symbol in the ELF file
 * @property {number?} size The size field of the symbol in the ELF file
 * @property {number?} visibility The visibility field of the symbol in the ELF file
 * @property {import('./shuntingYard.js').IdentifierValue} value The symbol's value
 */
 function makeSymbol({ name, type = undefined, bind = undefined, uses = [], references = [], definitions = [] } = {})
 {
     return {
        statement: null,
        name,
        references,
        definitions,
        uses,
        value: new IdentifierValue({ addend: 0n }),
        type,
        bind
     };
 }

/** @type {Map<string, Symbol>} */
export var symbols = new Map();
/** @type {string[]} */
export var fileSymbols = [];

export function loadSymbols(table, fileArr)
{
    symbols = table;
    fileSymbols = fileArr;
}

/** @param {Statement} instr */
export function queueRecomp(instr)
{
    if(!instr.wantsRecomp)
        recompQueue.push(instr.sectionNode);
    instr.wantsRecomp = true;
}

export class SymbolDefinition extends Statement
{
    /** @type {Symbol} */
    symbol;
    constructor({ name, opcodeRange = null, isLabel = false, compile = true, type = 0, bind = 0, ...config })
    {
        if(opcodeRange === null)
            opcodeRange = config.range;
        super(config);
        let uses = [];
        if(isLabel)
            this.expression = new CurrentIP(this);
        else
        {
            if(compile)
            {
                next();
                this.expression = new Expression(this, false, uses);
            }
        }

        // By now, the expression has been correctly parsed, so the instruction is not removed
        this.removed = false;

        if(symbols.has(name))
        {
            this.symbol = symbols.get(name);
            if(this.symbol.statement)
            {
                this.error = new ASMError(`This ${isLabel ? 'label' : 'symbol'} already exists`, opcodeRange);
                this.duplicate = true;
                this.symbol.definitions.push(this);
                return;
            }
            this.symbol.uses = uses;
            this.duplicate = false;
        }
        else
            symbols.set(name, this.symbol = makeSymbol({ name, type, bind, uses, definitions: [this] }));

        if(compile)
        {
            this.compile();
            for(const ref of this.symbol.references)
                if(!ref.removed)
                    queueRecomp(ref);
        }
    }

    // Re-evaluate the symbol. Return true if references to the symbol should be recompiled
    compile()
    {
        let originError = this.error;
        let originValue = this.symbol.value;
        let prevAbs = this.prevAbs;
        this.error = null;

        let value = undefined;
        try
        {
            value = this.symbol.value = this.expression.evaluate(this, false);
            this.symbol.statement = this;
            this.prevAbs = value.absoluteValue();
        }
        catch(e)
        {
            this.error = e;
        }
        return !(originError && this.error) && value && (originValue.addend !== value.addend
            || originValue.section !== value.section || prevAbs !== this.prevAbs);
    }

    recompile()
    {
        if(this.duplicate && this.symbol.statement)
            return;
        this.duplicate = false;
        if(this.compile())
        {
            this.symbol.statement = this;
            for(const ref of this.symbol.references)
                queueRecomp(ref);
        }
    }

    remove()
    {
        if(!this.duplicate)
        {
            let refs = this.symbol.references;
            if(refs.length > 0)
            {
                this.symbol.statement = null;
                this.symbol.uses = [];
                
                // Find a new definition for this symbol, if any exist
                let newDef = this.symbol.definitions.find(def => def.duplicate);
                if(newDef)
                    newDef.recompile();
                else
                    for(const instr of this.symbol.references)
                        queueRecomp(instr);
            }
            else
                symbols.delete(this.symbol.name);
        }
        super.remove();
    }
}

function getAlignment(x)
{
    return x <= 1n  ? 1n :
        x <= 2n ? 2n :
        x <= 4n ? 4n :
        x <= 8n ? 8n : 16n;
}

export class CommSymbol extends SymbolDefinition
{
    constructor({ name, opcodeRange = null, ...config })
    {
        super({ ...config, compile: false, bind: SYM_BINDS.global, type: SYM_TYPES.object, name: token });
        next();
        if(token != ',')
            throw new ASMError("Expected ','");
        next();
        this.sizeExpr = new Expression(this);
        this.alignExpr = null;

        if(token == ',')
        {
            next();
            this.alignExpr = new Expression(this);
        }
        this.removed = true;
        this.compile();
        for(const ref of this.symbol.references)
            if(!ref.removed)
                queueRecomp(ref);
    }

    compile()
    {
        let prevErr = this.error;
        this.error = null;
        try
        {
            const sizeVal = this.sizeExpr.evaluate(this, false, true);
            if(sizeVal.addend < 0n)
                throw new ASMError("Size cannot be negative", sizeVal.range);
            this.symbol.size = sizeVal.addend;
            
            if(this.alignExpr)
                this.symbol.value = this.alignExpr.evaluate(this, false, true);
            else
                this.symbol.value = new IdentifierValue({ addend: getAlignment(this.symbol.size) });
            this.symbol.value.section = pseudoSections.COM;

            this.removed = false;
            return prevErr !== null;
        }
        catch(e)
        {
            this.error = e;
            return prevErr === null;
        }
    }
}

export function referenceSymbol(instr, name, defining = false)
{
    let symbol;
    if(symbols.has(name))
    {
        symbol = symbols.get(name);
        symbol.references.push(instr);
        if(defining)
            symbol.definitions.push(instr);
    }
    else
        symbols.set(name, symbol = makeSymbol({ name, references: [instr], definitions: defining ? [instr] : [] }));
    return symbol;
}