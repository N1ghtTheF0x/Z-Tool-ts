import { int32, uint32 } from "../../common";
import { ControlData } from ".";

export interface SliderData extends ControlData
{
    mThumbWidth: uint32
    mThumbHeight: uint32
    mStartTextureID: int32
    mMiddleTextureID: int32
    mEndTextureID: int32
    mThumbTextureID: int32
    mMin: int32
    mMax: int32
    mStep: int32
    mValue: int32
    mColor: uint32
}