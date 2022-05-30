import { int32, uint32 } from "../../common";
import { ControlData } from ".";
import { AnimationListData } from "./animationlist";

export interface ViewData extends ControlData
{
    mNumTextures: uint32
    mNumSounds: uint32
    mTexturesOffset: uint32
    mSoundsOffset: uint32
    mControlsOffset: uint32
    mAnimationListOffset: uint32
    mBuffer: Buffer
    GetAnimationListData(): AnimationListData
    GetTextureIDs(): int32[]
    GetSoundIDs(): int32[]
    GetControlData(index: uint32): ControlData
}