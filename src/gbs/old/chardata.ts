import { stringify } from "querystring"
import { int32, Reader, uint } from "../../common"
import { ImageGlyphFlg } from "./imageglyphflg"

export interface CharData
{
    Char_Code: string
    igf: ImageGlyphFlg
    Char_X_Offs: int32
    Char_Y_Offs: int32
    Char_Width: int32
    Char_Height: int32
    Char_Top: int32
    Char_Advance: int32
    Char_LeftBearing: int32
    Char_Atlas_Index: int32
}

export function readCharData(buffer: Reader): CharData
{
    const Char_Code = buffer.readString(4)
    const igf = buffer.readInt32()
    const Char_X_Offs = buffer.readInt32()
    const Char_Y_Offs = buffer.readInt32()
    const Char_Width = buffer.readInt32()
    const Char_Height = buffer.readInt32()
    const Char_Top = buffer.readInt32()
    const Char_Advance = buffer.readInt32()
    const Char_LeftBearing = buffer.readInt32()
    const Char_Atlas_Index = buffer.readInt32()
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