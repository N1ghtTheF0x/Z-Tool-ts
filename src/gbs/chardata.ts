import { stringify } from "querystring"
import { Reader, uint } from "../common"
import { ImageGlyphFlg } from "./imageglyphflg"

export interface CharData
{
    Char_Code: string
    igf: ImageGlyphFlg
    Char_X_Offs: uint
    Char_Y_Offs: uint
    Char_Width: uint
    Char_Height: uint
    Char_Top: uint
    Char_Advance: uint
    Char_LeftBearing: uint
    Char_Atlas_Index: uint
}

export function readCharData(buffer: Reader): CharData
{
    const Char_Code = buffer.readString(4)
    const igf = buffer.readUInt()
    const Char_X_Offs = buffer.readUInt()
    const Char_Y_Offs = buffer.readUInt()
    const Char_Width = buffer.readUInt()
    const Char_Height = buffer.readUInt()
    const Char_Top = buffer.readUInt()
    const Char_Advance = buffer.readUInt()
    const Char_LeftBearing = buffer.readUInt()
    const Char_Atlas_Index = buffer.readUInt()
    return {
        Char_Code,
        igf,
        Char_X_Offs,
        Char_Y_Offs,
        Char_Width,
        Char_Height,
        Char_Top,
        Char_Advance,
        Char_LeftBearing,
        Char_Atlas_Index
    }
}