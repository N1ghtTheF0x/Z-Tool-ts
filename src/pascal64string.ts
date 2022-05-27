import { Reader, uint64 } from "./common";

export interface Pascal64string
{
    count: uint64
    chars: string
}

export function readPascal64string(buffer: Reader): Pascal64string
{
    const count = buffer.readUInt64()
    const chars = buffer.readString(Number(count))
    return {
        count,
        chars
    }
}