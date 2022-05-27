import { float, Reader, uint32, uint64 } from "../common";
import { Pascal64string, readPascal64string } from "../pascal64string";
import { readUV_TRACK, UV_TRACK } from "./uvtrack";

export interface FILE
{
    file_format_revision: Pascal64string
    unknownNumber: uint32
    nOfElements: uint64
    nOfUVTracks: uint64
    animationLengthInSeconds: float
    bone: FILE.BONE[]
    uv_tracks: FILE.UV_TRACKS[]
}

export namespace FILE
{
    export interface BONE
    {
        boneName: Pascal64string
        length: uint64
        unknownData: BONE.UNKNOWN_DATA[]
        length2: uint64
        unknownData2: BONE.UNKNOWN_DATA2[]
        length3: uint64
        unknownData3: BONE.UNKNOWN_DATA3[]
    }

    export namespace BONE
    {
        export interface UNKNOWN_DATA
        {
            a: float
            b: float
            c: float
        }
        export interface UNKNOWN_DATA2
        {
            a1: float
            b1: float
            c1: float
            d1: float
        }
        export interface UNKNOWN_DATA3
        {
            a2: float
            b2: float
            c2: float
        }
    }
    export function readBONE(buffer: Reader): BONE
    {
        const boneName = readPascal64string(buffer)
        const length = buffer.readUInt64()
        const unknownData: BONE.UNKNOWN_DATA[] = []
        for(var i = 0;i < length;i++)
            unknownData.push({
                a: buffer.readFloat(),
                b: buffer.readFloat(),
                c: buffer.readFloat()
            })
        const length2 = buffer.readUInt64()
        const unknownData2: BONE.UNKNOWN_DATA2[] = []
        for(var i = 0;i < length2;i++)
            unknownData2.push({
                a1: buffer.readFloat(),
                b1: buffer.readFloat(),
                c1: buffer.readFloat(),
                d1: buffer.readFloat()
            })
        const length3 = buffer.readUInt64()
        const unknownData3: BONE.UNKNOWN_DATA3[] = []
        for(var i = 0;i < length3;i++)
            unknownData3.push({
                a2: buffer.readFloat(),
                b2: buffer.readFloat(),
                c2: buffer.readFloat()
            })
        return {
            boneName,
            length,
            unknownData,
            length2,
            unknownData2,
            length3,
            unknownData3
        }
    }
    export interface UV_TRACKS
    {
        type: Pascal64string
        track: UV_TRACK
    }
    export function readUV_TRACKS(buffer: Reader): UV_TRACKS
    {
        const type = readPascal64string(buffer)
        const track = readUV_TRACK(buffer)
        return {
            type,
            track
        }
    }
}

export function readFILE(buffer: Reader): FILE
{
    const file_format_revision = readPascal64string(buffer)
    const unknownNumber = buffer.readUInt32()
    const nOfElements = buffer.readInt64()
    const nOfUVTracks = buffer.readInt64()
    const animationLengthInSeconds = buffer.readFloat()
    const bone: FILE.BONE[] = []
    for(var i = 0;i < nOfElements;i++)
        bone.push(FILE.readBONE(buffer))
    const uv_tracks: FILE.UV_TRACKS[] = []
    for(var i = 0;i < nOfUVTracks;i++)
        uv_tracks.push(FILE.readUV_TRACKS(buffer))

    return {
        file_format_revision,
        unknownNumber,
        nOfElements,
        nOfUVTracks,
        animationLengthInSeconds,
        bone,
        uv_tracks
    }
}