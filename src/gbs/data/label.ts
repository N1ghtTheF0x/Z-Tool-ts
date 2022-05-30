import { float, int, int32, uint32 } from "../../common";
import { ControlData } from ".";

export interface LabelData extends ControlData
{
    mFontID: uint32
    mColor: uint32
    mScaleX: float
    mScaleY: float
    mSkew: float
    mDropShadow: int
    mHAlign: uint32
    mVAlign: uint32
    mLeading: float
    mTracking: int32
    mTextFit: uint32
    mTextBufferSize: uint32
    mBuffer: Buffer
    GetText(): string
}