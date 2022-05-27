import { float, Reader, SignedBytes, uint32, uint64 } from "../common";
import { Pascal64string, readPascal64string } from "../pascal64string";

export interface FILE
{
    file_format_revision: Pascal64string
    nOfBones: uint64
    bones: FILE.BONE[]
}

export namespace FILE
{
    export interface BONE
    {
        name: Pascal64string
        parentBone: uint32
        boneBaseMatrix: float[] // 16
    }
}

export function readFILE(buffer: Reader): FILE
{
    const file_format_revision = readPascal64string(buffer)
    const nOfBones = buffer.readUInt64()
    const bones: FILE.BONE[] = []
    for(var i = 0;i < nOfBones;i++)
        bones.push({
            name: readPascal64string(buffer),
            parentBone: buffer.readUInt32(),
            boneBaseMatrix: buffer.readArray(16,SignedBytes.float)
        })
    return {
        file_format_revision,
        nOfBones,
        bones
    }
}