import { long, Reader, uchar, UnsignedBytes } from "../common";
import { Header } from "./header";

export interface UnknownChunk
{
    chunkID: Header.ID
    chunkSize: long
    unknownData: uchar[]
    padding?: uchar
}

export function UnknownChunk(buffer: Reader): UnknownChunk
{
    const chunkID = Header.ID(buffer)
    const chunkSize = buffer.readLong()
    const unknownData = buffer.readUArray(chunkSize,UnsignedBytes.uchar)
    const padding = Boolean(chunkSize & 1) && (buffer.offset < buffer.buf.byteLength) ? buffer.readUChar() : NaN

    return {
        chunkID,
        chunkSize,
        unknownData,
        padding
    }
}