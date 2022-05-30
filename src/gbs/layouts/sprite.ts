import { float, uint32 } from "../../common";
import { ControlLayout } from ".";

export interface SpriteLayout extends ControlLayout
{
    mColor: uint32
    mSkew: float
}