import { int32, uint32 } from "../../common";
import { TextureRect } from "../common";

export interface TextureData
{
    mTextureID: uint32
    mTextureName: string // 256
    mRefCount: int32
    mTextureRect: TextureRect
}