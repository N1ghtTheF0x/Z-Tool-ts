import { ActionData } from ".";
import { float, uint32 } from "../../common";
import { FourCC } from "../constants";

export interface SoundActionData extends ActionData
{
    mFourCC: FourCC
    mSoundID: uint32
    mVolume: float
}