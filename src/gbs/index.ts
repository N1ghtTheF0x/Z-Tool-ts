import { readFileSync } from "fs";
import { buffer } from "stream/consumers";
import { Reader } from "../common";
import { FontTableHeader, readFontTableHeader } from "./fonttableheader";
import { Header, readHeader } from "./header";

export class GBS
{
    readonly header: Header
    readonly fonttables: ReadonlyArray<FontTableHeader>
    constructor(readonly path: string)
    {
        const reader = new Reader(readFileSync(this.path))
        this.header = this.__readHeader(reader)
        this.fonttables = this.__readfth(reader)
    }
    private __readHeader(buffer: Reader)
    {
        return readHeader(buffer)
    }
    private __readfth(buffer: Reader)
    {
        const fonttables = []
        buffer.endianess = "little"
        try
        {
            const tag = buffer.readUInt()
            if(tag == 0x47464E54)
            {
                const fth = readFontTableHeader(buffer)
                fonttables.push(fth)
            }
        }
        catch(e)
        {
            
        }
        return fonttables
    }
}