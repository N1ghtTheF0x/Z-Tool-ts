import { uint32 } from "../../common";
import { ControlData } from ".";

export interface GroupData extends ControlData
{
    mNumControls: uint32
    mBuffer: Buffer
    GetControlData(index: uint32): ControlData
}