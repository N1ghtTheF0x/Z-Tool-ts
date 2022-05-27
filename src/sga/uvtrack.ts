import { float, Reader, uint64 } from "../common";

export interface UV_TRACK
{
    nOfAnimationFrames: uint64
    track: UV_TRACK.UV_COORDS[]
    nOfUnknown1: uint64
    unknown: UV_TRACK.UNKNOWN[]
    nOfTime: uint64
    time: UV_TRACK.TIME[]
}

export namespace UV_TRACK
{
    export interface UV_COORDS
    {
        u: float
        v: float
    }
    export function readUV_COORDS(buffer: Reader): UV_COORDS
    {
        return {
            u: buffer.readFloat(),
            v: buffer.readFloat()
        }
    }
    export interface UNKNOWN
    {
        unknownData: string // 4
    }
    export function readUNKNOWN(buffer: Reader): UNKNOWN
    {
        return {
            unknownData: buffer.readString(4)
        }
    }
    export interface TIME
    {
        u: float
        v: float
    }
    export function readTIME(buffer: Reader): TIME
    {
        return {
            u: buffer.readFloat(),
            v: buffer.readFloat()
        }
    }
}

export function readUV_TRACK(buffer: Reader): UV_TRACK
{
    const nOfAnimationFrames = buffer.readUInt64()
    const track: UV_TRACK.UV_COORDS[] = []
    for(var i = 0;i < nOfAnimationFrames;i++)
        track.push(UV_TRACK.readUV_COORDS(buffer))
    const nOfUnknown1 = buffer.readUInt64()
    const unknown: UV_TRACK.UNKNOWN[] = []
    for(var i = 0;i < nOfUnknown1;i++)
        unknown.push(UV_TRACK.readUNKNOWN(buffer))
    const nOfTime = buffer.readUInt64()
    const time: UV_TRACK.TIME[] = []
    for(var i = 0;i < nOfTime;i++)
        time.push(UV_TRACK.readTIME(buffer))
    return {
        nOfAnimationFrames,
        track,
        nOfUnknown1,
        unknown,
        nOfTime,
        time
    }
}