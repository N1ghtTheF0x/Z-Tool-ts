import { float, uint32 } from "../../common";
import { ActionData } from "../action";
import { ControlData } from ".";

export interface ButtonData extends ControlData
{
    mDefaultTextureID: uint32
    mDownTextureID: uint32
    mFontID: uint32
    mDefaultColor: uint32
    mDownColor: uint32
    mScaleX: float
    mScaleY: float
    mHAlign: uint32
    mVAlign: uint32
    mNumOnClickActions: uint32
    mTextBufferSize: uint32
    mBuffer: Buffer
    GetText(): string
    GetAction(index: uint32): ActionData
}