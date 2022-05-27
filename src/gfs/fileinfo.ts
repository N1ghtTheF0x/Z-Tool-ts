import { int32, int64, Reader } from "../common";

export interface FileInfo
{
    file_path_length: int64
    reference_path: string
    reference_length: int64
    reference_alignment: int32
}

export function readFileInfo(buffer: Reader): FileInfo
{
    const file_path_length = buffer.readInt64()
    const reference_path = buffer.readString(Number(file_path_length))
    const reference_length = buffer.readInt64()
    const reference_alignment = buffer.readInt32()
    return {
        file_path_length,
        reference_path,
        reference_length,
        reference_alignment
    }
}