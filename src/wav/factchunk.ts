import { long, Reader, ulong } from "../common";
import { Header } from "./header";

export interface FactChunk
{
    chunkID: Header.ID
    chunkSize: long
    uncompressedSize: ulong
}

export function FactChunk(buffer: Reader): FactChunk
{
    const chunkID = Header.ID(buffer)
    const chunkSize = buffer.readLong()
    const uncompressedSize = buffer.readULong()
    return {
        chunkID,
        chunkSize,
        uncompressedSize
    }
}