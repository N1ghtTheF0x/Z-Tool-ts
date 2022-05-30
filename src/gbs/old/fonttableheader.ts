import { int32, Reader } from "../../common"
import { CharData, readCharData } from "./chardata"

export interface FontTableHeader
{
    GFNT: string
    Font_Length: int32
    Font_ID: int32
    Font_Name: string // 64
    Font_Size: int32
    Atlas_Width: int32
    Atlas_Height: int32
    MaxTop: int32
    Atlas_Count: int32
    Chars_Count: int32
    chb: FontTableHeader.CharBlock
}

export namespace FontTableHeader
{
    export interface CharBlock
    {
        chsd: CharData[]
    }
}

export function readFontTableHeader(buffer: Reader): FontTableHeader
{
    const GFNT = buffer.readString(4)
    const Font_Length = buffer.readInt32()
    const Font_ID = buffer.readInt32()
    const Font_Name = buffer.readString(64)
    const Font_Size = buffer.readInt32()
    const Atlas_Width = buffer.readInt32()
    const Atlas_Height = buffer.readInt32()
    const MaxTop = buffer.readInt32()
    const Atlas_Count = buffer.readInt32()
    const Chars_Count = buffer.readInt32()
    const chb: FontTableHeader.CharBlock = {
        chsd: []
    }
    for(var i = 0;i < Chars_Count;i++)
        chb.chsd.push(readCharData(buffer))
    return {
        GFNT,
        Font_Length,
        Font_ID,
        Font_Name,
        Font_Size,
        Atlas_Width,
        Atlas_Height,
        MaxTop,
        Atlas_Count,
        Chars_Count,
        chb
    }
}