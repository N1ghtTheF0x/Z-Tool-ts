import { Reader } from "../common";
import { ActionData } from "./action";
import { MessageActionData } from "./action/message";
import { SoundActionData } from "./action/sound";
import { FourCC } from "./constants";
import { ControlData } from "./data";
import { SpriteData } from "./data/sprite";
import { ControlLayout } from "./layouts";
import { SpriteLayout } from "./layouts/sprite";

export class OtterControlLayout implements ControlLayout
{
    mFourCC: FourCC
    mDataSize: number
    mCenterX: number
    mCenterY: number
    mX: number
    mY: number
    mWidth: number
    mHeight: number
    mRotation: number
    constructor(buffer: Reader)
    {
        this.mFourCC = buffer.readString(4) as FourCC
        this.mDataSize = buffer.readUInt32()
        this.mCenterX = buffer.readFloat()
        this.mCenterY = buffer.readFloat()
        this.mX = buffer.readFloat()
        this.mY = buffer.readFloat()
        this.mWidth = buffer.readFloat()
        this.mHeight = buffer.readFloat()
        this.mRotation = buffer.readFloat()
    }
}

export class OtterControlData implements ControlData
{
    mFourCC: FourCC
    mDataSize: number
    mID: number
    mName: string
    mPosition: [number, number]
    mCenter: [number, number]
    mSize: [number, number]
    mRotation: number
    mAnchorFlags: number
    mMaskID: number
    constructor(buffer: Reader)
    {
        this.mFourCC = buffer.readString(4) as FourCC
        this.mDataSize = buffer.readUInt32()
        this.mID = buffer.readUInt32()
        this.mName = buffer.readString(64)
        this.mPosition = [buffer.readFloat(),buffer.readFloat()]
        this.mCenter = [buffer.readFloat(),buffer.readFloat()]
        this.mSize = [buffer.readFloat(),buffer.readFloat()]
        this.mRotation = buffer.readFloat()
        this.mAnchorFlags = buffer.readUInt32()
        this.mMaskID = buffer.readInt()
    }
}

export class OtterActionData implements ActionData
{
    mFourCC: FourCC
    mDataSize: number
    constructor(buffer: Reader)
    {
        this.mFourCC = buffer.readString(4) as FourCC
        this.mDataSize = buffer.readUInt32()
    }
}

export class OtterMessageActionData extends OtterActionData implements MessageActionData
{
    mMessageID: number
    constructor(buffer: Reader)
    {
        super(buffer)
        this.mMessageID = buffer.readUInt32()
    }
}

export class OtterSoundActionData extends OtterActionData implements SoundActionData
{
    mSoundID: number
    mVolume: number
    constructor(buffer: Reader)
    {
        super(buffer)
        this.mSoundID = buffer.readUInt32()
        this.mVolume = buffer.readFloat()
    }
}

export class OtterSpriteLayout extends OtterControlLayout implements SpriteLayout
{
    mColor: number
    mSkew: number
    constructor(buffer: Reader)
    {
        super(buffer)
        this.mColor = buffer.readUInt32()
        this.mSkew = buffer.readFloat()
    }
}

export class OtterSpriteData extends OtterControlData implements SpriteData
{
    mTextureID: number
    mColor: number
    mSkew: number
    mFlipType: number
    mNumControls: number
    mBuffer: Buffer
    constructor(buffer: Reader)
    {
        super(buffer)
        this.mTextureID = buffer.readInt32()
        this.mColor = buffer.readUInt32()
        this.mSkew = buffer.readFloat()
        this.mFlipType = buffer.readUInt32()
        this.mNumControls = buffer.readUInt32()
        this.mBuffer = buffer.slice(buffer.offset,buffer.offset + this.mDataSize).buf
    }
    GetControlData(index: number): ControlData 
    {
        if(index >= this.mNumControls) return null as unknown as ControlData
        const reader = new Reader(this.mBuffer)
        var pControlData = new OtterControlData(reader)
        for(var i = 0;i < index;i++)
        {
            reader.offset += pControlData.mDataSize + reader.offset
            pControlData = new OtterControlData(reader)
        }
        return pControlData
    }
}