import { uint32 } from "../../common"
import { ActionData } from "../action"

export interface MainChannelFrameData
{
    mFourCC: "MCFR"
    mDataSize: uint32
    mName: string // 64
    mNumActions: uint32
    mBuffer: Buffer
    GetAction(index: uint32): ActionData
}