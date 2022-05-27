import { Reader, uint } from "../common"
import { CharData, readCharData } from "./chardata"

export interface FontTableHeader
{
    GFNT: string
    Font_Length: uint
    Font_ID: uint
    Font_Name: string // 64
    Font_Size: uint
    Atlas_Width: uint
    Atlas_Height: uint
    MaxTop: uint
    Atlas_Count: uint
    Chars_Count: uint
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
    const Font_Length = buffer.readUInt()
    const Font_ID = buffer.readUInt()
    const Font_Name = buffer.readString(64)
    const Font_Size = buffer.readUInt()
    const Atlas_Width = buffer.readUInt()
    const Atlas_Height = buffer.readUInt()
    const MaxTop = buffer.readUInt()
    const Atlas_Count = buffer.readUInt()
    const Chars_Count = buffer.readUInt()
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