import { int32, uint32 } from "../../common";

export interface SoundData
{
    mSoundID: uint32
    mSoundName: string // 256
    mRefCount: int32
}