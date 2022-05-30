import { float, int, int32, Reader, uint32 } from "../common";
import { FourCC } from "./constants";
import { ControlLayout } from "./layouts";

export class TextureRect
{
    mTextureID: uint32
    uv: [float,float,float,float]
    constructor(buffer: Reader)
    {
        this.mTextureID = buffer.readUInt32()
        this.uv = [
            buffer.readFloat(),
            buffer.readFloat(),
            buffer.readFloat(),
            buffer.readFloat()
        ]
    }
}

export class KeyFrameData
{
    mFourCC: FourCC
    mDataSize: uint32
    mFrame: uint32
    mEaseType: int32
    mEaseAmount: int32
    mLeftAbs: float
    mLeftRel: float
    mRightAbs: float
    mRightRel: float
    mTopAbs: float
    mTopRel: float
    mBottomAbs: float
    mBottomRel: float
    mBuffer: Buffer
    constructor(buffer: Reader)
    {
        this.mFourCC = buffer.readString(4) as FourCC
        this.mDataSize = buffer.readUInt32()
        this.mFrame = buffer.readUInt32()
        this.mEaseType = buffer.readInt32()
        this.mEaseAmount = buffer.readInt32()
        this.mLeftAbs = buffer.readFloat()
        this.mLeftRel = buffer.readFloat()
        this.mRightAbs = buffer.readFloat()
        this.mRightRel = buffer.readFloat()
        this.mTopAbs = buffer.readFloat()
        this.mTopRel = buffer.readFloat()
        this.mBottomAbs = buffer.readFloat()
        this.mBottomRel = buffer.readFloat()
        this.mBuffer = buffer.slice(buffer.offset,buffer.offset + this.mDataSize).buf
    }
    GetLayout(): ControlLayout
    {
        throw new Error("Method not implemented!")
    }
}