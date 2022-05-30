import { uint32 } from "../../common";
import { FourCC } from "../constants";
import { GlyphData } from "./glyph";

export interface FontData
{
    mFourCC: FourCC
    mData: uint32
    mID: uint32
    mName: string // 64
    mFontSize: uint32
    mFontWidth: uint32
    mFontHeight: uint32
    mMaxTop: uint32
    mNumTextures: uint32
    mNumGlyphs: uint32
    mBuffer: Buffer
    GetGlyphData(uc: uint32,imageGlyph?: boolean): GlyphData
}