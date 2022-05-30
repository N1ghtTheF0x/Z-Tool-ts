import { uint32 } from "../../common"
import { AnimationData } from "./animation"

export interface AnimationListData
{
    mFourCC: "GGAL"
    mDataSize: uint32
    mNumAnimations: uint32
    mBuffer: Buffer
    GetAnimation(index: uint32): AnimationData
}