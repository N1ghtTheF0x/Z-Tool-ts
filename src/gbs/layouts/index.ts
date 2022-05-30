import { float, uint32 } from "../../common"
import { FourCC } from "../constants"

export interface ControlLayout
{
    mFourCC: FourCC
    mDataSize: uint32
    mCenterX: float
    mCenterY: float
    mX: float
    mY: float
    mWidth: float
    mHeight: float
    mRotation: float
}