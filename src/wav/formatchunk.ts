import { long, Reader, short, uchar, ulong, UnsignedBytes, ushort } from "../common";
import { Header } from "./header";

export interface FormatChunk
{
    chunkID: Header.ID
    chunkSize: long
    // pos = offset
    wFormatTag: short
    wChannels: ushort
    dwSamplesPerSec: ulong
    dwAvgBytesPerSec: ulong
    wBlockAlign: ushort
    wBitsPerSample: ushort
    // wFormatTag == 17
    wcbsize?: ushort
    wSamplesPerBlock?: ushort
    // chunkSize > (offset - pos)
    unknown?: uchar[] //  chunkSize - (offset - pos)
    // chunkSize & 1
    padding?: uchar
}

export function FormatChunk(buffer: Reader): FormatChunk
{
    const chunkID = Header.ID(buffer)
    const chunkSize = buffer.readLong()
    const pos = Number(buffer.offset)
    const wFormatTag = buffer.readShort()
    const wChannels = buffer.readUShort()
    const dwSamplesPerSec = buffer.readULong()
    const dwAvgBytesPerSec = buffer.readULong()
    const wBlockAlign = buffer.readUShort()
    const wBitsPerSample = buffer.readUShort()
    const wcbsize = wFormatTag == 17 ? buffer.readUShort() : NaN
    const wSamplesPerBlock = wFormatTag == 17 ? buffer.readUShort() : NaN
    const unknown = chunkSize > (buffer.offset - pos) ? buffer.readUArray(chunkSize - (buffer.offset - pos),UnsignedBytes.uchar) : []
    const padding = Boolean(chunkSize & 1) ? buffer.readUChar() : NaN

    return {
        chunkID,
        chunkSize,
        wFormatTag,
        wChannels,
        dwSamplesPerSec,
        dwAvgBytesPerSec,
        wBlockAlign,
        wBitsPerSample,
        wcbsize,
        wSamplesPerBlock,
        unknown,
        padding
    }
}