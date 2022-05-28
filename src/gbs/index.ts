import { File } from "../common";
import { FontTableHeader, readFontTableHeader } from "./fonttableheader";
import { Header, readHeader } from "./header";

export class GBS extends File
{
    readonly header: Header
    readonly fonttables: ReadonlyArray<FontTableHeader>
    constructor(readonly path: string)
    {
        super(path)
        this.header = this.__readHeader()
        this.fonttables = this.__readfth()
    }
    private __readHeader()
    {
        return readHeader(this.reader)
    }
    private __readfth()
    {
        const fonttables = []
        this.reader.endianess = "little"
        try
        {
            const tag = this.reader.readUInt()
            if(tag == 0x47464E54)
            {
                const fth = readFontTableHeader(this.reader)
                fonttables.push(fth)
            }
        }
        catch(e)
        {
            
        }
        this.reader.endianess = "big"
        return fonttables
    }
}