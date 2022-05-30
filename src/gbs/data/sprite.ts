import { char, float, int32, uint32 } from "../../common";
import { ControlData } from ".";

export interface SpriteData extends ControlData
{
    mTextureID: int32
    mColor: uint32
    mSkew: float
    mFlipType: uint32
    mNumControls: uint32
    mBuffer: Buffer
    GetControlData(index: uint32): ControlData
}