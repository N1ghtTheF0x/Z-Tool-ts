import { File } from "../../common";
import { FontsBlock, readFontsBlock } from "./fontblock";
import { FontTableHeader, readFontTableHeader } from "./fonttableheader";
import { Header, readHeader } from "./header";
import { readTexturesBlock } from "./textureblock";

export class GBS extends File
{
    readonly header: Header
    readonly fontsblock: FontsBlock
    constructor(readonly path: string)
    {
        super(path)
        this.__checkHeader()
        this.header = this.__readHeader()
        const data = this.__read()
        this.fontsblock = {fnts: data.fontsblock}
    }
    private __checkHeader()
    {
        const id = this.reader.buf.toString("utf-8",0,4)
        if(id == "GGSC") this.reader.endianess = "big"
        else if(id == "CSGG") this.reader.endianess = "little"
    }
    private __readHeader()
    {
        return readHeader(this.reader)
    }
    private __read()
    {
        const fontsblock = []
        if(this.header.Fonts_Count > 0)
        {
            this.reader.offset = this.header.fontOffsetPos + 56
            for(var i = 0;i < this.header.Fonts_Count;i++)
            {
                const ftb = readFontTableHeader(this.reader)
                fontsblock.push(ftb)
            }
        }
        return {
            fontsblock
        }
    }
}