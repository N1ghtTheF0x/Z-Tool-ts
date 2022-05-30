import { uint32 } from "../../common";

export interface GlyphData
{
    mCharCode: uint32
    mIsImageGlyph: uint32
    mX: uint32
    mY: uint32
    mWidht: uint32
    mHeight: uint32
    mTop: uint32
    mAdvance: uint32
    mLeftBearing: uint32
    mAtlasIndex: uint32
}