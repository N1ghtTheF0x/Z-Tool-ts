import { char, long, Reader, SignedBytes, uchar, uint, UnsignedBytes } from "../common";
import { Header } from "./header";

export interface ListChunk
{
    chunkID: Header.ID
    chunkSize: long
    // pos = offset
    chunkType: Header.ID
    // size
    subchunk: ListChunk.Sub[]
    unknown?: uchar[] // chunkSize - (offset - pos)
    padding?: uchar
}

export function ListChunk(buffer: Reader): ListChunk
{
    const chunkID = Header.ID(buffer)
    const chunkSize = buffer.readLong()
    const pos = Number(buffer.offset)
    const chunkType = Header.ID(buffer)
    const subchunk = []
    const unknown = []

    while(buffer.offset - pos < chunkSize)
    {
        buffer.offset += 4
        const size: uint = buffer.readUInt()
        buffer.offset -= UnsignedBytes.uint + 4
        if(buffer.offset - pos + size <= chunkSize)
            subchunk.push(ListChunk.Sub(buffer))
        else
            unknown.push(...buffer.readUArray(chunkSize - (buffer.offset - pos)))
    }

    const padding = Boolean(chunkSize & 1) && (buffer.offset < buffer.buf.byteLength) ? buffer.readUChar() : NaN

    return {
        chunkID,
        chunkSize,
        chunkType,
        subchunk,
        unknown,
        padding
    }
}

export namespace ListChunk
{
    export interface Sub
    {
        chunkID: Header.ID
        chunkSize: long
        listData: char[] // chunkSize
        padding?: uchar
    }
    export function Sub(buffer: Reader): Sub
    {
        const chunkID = Header.ID(buffer)
        const chunkSize = buffer.readLong()
        const listData = buffer.readArray(chunkSize,SignedBytes.char)
        const padding = Boolean(chunkSize & 1) && (buffer.offset < buffer.buf.byteLength) ? buffer.readUChar() : NaN

        return {
            chunkID,
            chunkSize,
            listData,
            padding
        }
    }
}