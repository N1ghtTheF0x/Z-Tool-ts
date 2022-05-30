import { uint32 } from "../../common";
import { FourCC } from "../constants";

export interface ActionData
{
    mFourCC: FourCC
    mDataSize: uint32
}