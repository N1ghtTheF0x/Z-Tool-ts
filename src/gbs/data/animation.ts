import { int32, uint32, ustring } from "../../common"
import { AnimationChannelData } from "../channel/animation"
import { MainChannelFrameData } from "../channel/mainframe"

export interface AnimationData
{
    mFourCC: "GGAN"
    mDataSize: uint32
    mName: ustring // uint8[64]
    mNumFrames: uint32
    mRepeatStart: int32
    mRepeatEnd: int32
    mNumAnimationChannels: uint32
    mNumMainChannelFrames: uint32
    mBuffer: Buffer
    GetAnimationChannel(index: uint32): AnimationChannelData
    GetMainChannelFrameData(index: uint32): MainChannelFrameData
}