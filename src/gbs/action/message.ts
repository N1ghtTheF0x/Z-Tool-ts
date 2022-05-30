import { ActionData } from ".";
import { uint32 } from "../../common";
import { FourCC } from "../constants";

export interface MessageActionData extends ActionData
{
    mFourCC: FourCC
    mMessageID: uint32
}