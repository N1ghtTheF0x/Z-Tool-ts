import { uint32 } from "../../common";
import { ControlData } from ".";

export interface TableData extends ControlData
{
    mDefaultRowHeight: uint32
    mRowSpacing: uint32
}