import { float, int, uint32 } from "../../common"
import { FourCC } from "../constants"

export interface ControlData
{
    mFourCC: FourCC
    mDataSize: uint32
    mID: uint32
    mName: string // 64
    mPosition: [float,float]
    mCenter: [float,float]
    mSize: [float,float]
    mRotation: float
    mAnchorFlags: uint32
    mMaskID: int
}