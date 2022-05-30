import { Reader } from "../../common";
import { FontTableHeader, readFontTableHeader } from "./fonttableheader";
import { Header } from "./header";

export interface FontsBlock
{
    fnts: FontTableHeader[]
}

export function readFontsBlock(buffer: Reader,header: Header): FontsBlock
{
    const old_offset = Number(buffer.offset)
    buffer.offset = header.fontOffsetPos
    const fnts = []
    for(var i = 0;i < header.Fonts_Count;i++)
        fnts.push(readFontTableHeader(buffer))
    buffer.offset = old_offset
    return {
        fnts
    }
}