import { long, Reader, uchar, UnsignedBytes } from "../common";
import { Header } from "./header";

export interface CueChunk
{
    chunkID: Header.ID
    chunkSize: long
    // pos = offset
    dwCuePoints: long
    points: CueChunk.Point[] // dwCuePoints
    // chunkSize > (offset - pos)
    unknown?: uchar[] // chunkSize - (offset - pos)
}

export function CueChunk(buffer: Reader): CueChunk
{
    const chunkID = Header.ID(buffer)
    const chunkSize = buffer.readLong()
    const pos = Number(buffer.offset)
    const dwCuePoints = buffer.readLong()
    const points = []
    for(var i = 0;i < dwCuePoints;i++)
        points.push(CueChunk.Point(buffer))
    const unknown = chunkSize > (buffer.offset - pos) ? buffer.readUArray(chunkSize - (buffer.offset - pos),UnsignedBytes.uchar) : []

    return {
        chunkID,
        chunkSize,
        dwCuePoints,
        points,
        unknown
    }
}

export namespace CueChunk
{
    export interface Point
    {
        dwIdentifier: long
        dwPosition: long
        fccChunk: Header.ID
        dwChunkStart: long
        dwBlockStart: long
        dwSampleOffset: long
    }
    export function Point(buffer: Reader): Point
    {
        const dwIdentifier = buffer.readLong()
        const dwPosition = buffer.readLong()
        const fccChunk = Header.ID(buffer)
        const dwChunkStart = buffer.readLong()
        const dwBlockStart = buffer.readLong()
        const dwSampleOffset = buffer.readLong()

        return {
            dwIdentifier,
            dwPosition,
            fccChunk,
            dwChunkStart,
            dwBlockStart,
            dwSampleOffset
        }
    }
}