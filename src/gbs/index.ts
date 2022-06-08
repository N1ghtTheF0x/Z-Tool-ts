import { Reader } from "../common";
import { ActionData } from "./action";
import { MessageActionData } from "./action/message";
import { SoundActionData } from "./action/sound";
import { FourCC } from "./constants";
import { ControlLayout } from "./layouts";

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