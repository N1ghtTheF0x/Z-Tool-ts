import { int, long, Reader, short, SignedBytes, uchar, UnsignedBytes } from "../common";
import { FormatChunk } from "./formatchunk";
import { Header } from "./header";

export interface DataChunk
{
    chunkID: Header.ID
    chunkSize: long
    // extends
    padding?: uchar
}

export function DataChunk(buffer: Reader,format: FormatChunk): DataChunk
{
    const chunkID = Header.ID(buffer)
    const chunkSize = buffer.readLong()

    if(((format.wBitsPerSample != 8) &&
       (format.wBitsPerSample != 16) &&
       (format.wBitsPerSample != 32)) ||
       (chunkSize % format.wBlockAlign != 0))
    {
        const waveformData = buffer.readUArray(chunkSize,UnsignedBytes.uchar)
        const padding = Boolean(chunkSize & 1) && (buffer.offset < buffer.buf.byteLength) ? buffer.readUChar() : NaN

        const obj: DataChunkUnknown = {
            chunkID,
            chunkSize,
            waveformData,
            padding
        }
        return obj
    }
    else if((format.wChannels == 1) && (format.wBitsPerSample == 8))
    {
        const samples = buffer.readUArray(chunkSize,UnsignedBytes.uchar)
        const padding = Boolean(chunkSize & 1) && (buffer.offset < buffer.buf.byteLength) ? buffer.readUChar() : NaN

        const obj: DataChunk8Bit = {
            chunkID,
            chunkSize,
            samples,
            padding
        }
        return obj
    }
    else if((format.wChannels == 1) && (format.wBitsPerSample == 16))
    {
        const samples = buffer.readArray(chunkSize,SignedBytes.short)
        const padding = Boolean(chunkSize & 1) && (buffer.offset < buffer.buf.byteLength) ? buffer.readUChar() : NaN

        const obj: DataChunk16Bit = {
            chunkID,
            chunkSize,
            samples,
            padding
        }
        return obj
    }
    else if((format.wChannels == 1) && (format.wBitsPerSample == 32))
    {
        const samples = buffer.readArray(chunkSize,SignedBytes.int)
        const padding = Boolean(chunkSize & 1) && (buffer.offset < buffer.buf.byteLength) ? buffer.readUChar() : NaN

        const obj: DataChunk32Bit = {
            chunkID,
            chunkSize,
            samples,
            padding
        }
        return obj
    }
    else
    {
        const samples = []
        for(var i = 0;i < chunkSize / format.wBlockAlign;i++)
            samples.push(DataChunk.Samples(buffer,format))
        const padding = Boolean(chunkSize & 1) && (buffer.offset < buffer.buf.byteLength) ? buffer.readUChar() : NaN

        const obj: DataChunkOther = {
            chunkID,
            chunkSize,
            samples,
            padding
        }
        return obj
    }
}

export namespace DataChunk
{
    export interface Samples
    {
        channels: number[] // wChannels
    }
    export interface Samples8Bit extends Samples
    {
        channels: uchar[]
    }
    export interface Samples16Bit extends Samples
    {
        channels: short[]
    }
    export interface Samples32Bit extends Samples
    {
        channels: int[]
    }
    export function Samples(buffer: Reader,format: FormatChunk): Samples
    {
        switch(format.wChannels)
        {
            case 8:
                return {
                    channels: buffer.readUArray(format.wChannels,UnsignedBytes.uchar)
                }
            case 16:
                return {
                    channels: buffer.readArray(format.wChannels,SignedBytes.short)
                }
            case 32:
                return {
                    channels: buffer.readArray(format.wChannels,SignedBytes.int)
                }
            default:
                return {
                    channels: []
                }
        }
    }
}

export interface DataChunkUnknown extends DataChunk
{
    waveformData: uchar[] // chunkSize
}

// wChannels == 1 && wBitsPerSample == 8
export interface DataChunk8Bit extends DataChunk
{
    samples: uchar[] // chunkSize
}

// wChannels == 1 && wBitsPerSample == 16
export interface DataChunk16Bit extends DataChunk
{
    samples: short[] // chunkSize
}

// wChannels == 1 && wBitsPerSample == 32
export interface DataChunk32Bit extends DataChunk
{
    samples: int[] // chunkSize
}

export interface DataChunkOther extends DataChunk
{
    samples: DataChunk.Samples[] // chunkSize / wBlockAlign
}
