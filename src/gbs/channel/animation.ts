import { int32, uint32 } from "../../common"
import { KeyFrameData } from "../common"

export interface AnimationChannelData
{
    mFourCC: "GGAC"
    mDataSize: uint32
    mControlID: int32
    mNumKeyFrames: uint32
    mBuffer: Buffer
    GetKeyFrameData(index: uint32): KeyFrameData
}