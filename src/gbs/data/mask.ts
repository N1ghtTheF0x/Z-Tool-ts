import { float, int32, uint32 } from "../../common";
import { ControlData } from ".";

export interface MaskData extends ControlData
{
    mTextureID: int32
    mSkew: float
    mFlipType: uint32
}