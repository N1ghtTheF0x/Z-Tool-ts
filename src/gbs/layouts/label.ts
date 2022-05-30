import { float, int, uint32 } from "../../common";
import { ControlLayout } from ".";

export interface LabelLayout extends ControlLayout
{
    mColor: uint32
    mScaleX: float
    mScaleY: float
    mSkew: float
    mDropShadow: int
}