import { int32, uint32 } from "../../common";
import { ControlData } from ".";

export interface ToggleData extends ControlData
{
    mOnTextureID: int32
    mOffTextureID: int32
    mColor: uint32
}