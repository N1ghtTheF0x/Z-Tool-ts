import { int32, Reader } from "../../common";

export interface TexturesBlock
{
    a: int32
}

export function readTexturesBlock(buffer: Reader): TexturesBlock
{
    const a = buffer.readInt32()
    return {
        a
    }
}