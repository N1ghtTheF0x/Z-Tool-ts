import { int32, int64, Reader, SignedBytes, Writer } from "../common";

export interface Header
{
    data_offset: int32
    file_identifier_length: int64
    file_identifier: string // 20 = "Reverge Package File"
    file_version_length: int64
    file_version: string // 3 = "x.x"
    n_of_files: int64
}

export function readHeader(buffer: Reader): Header
{
    const data_offset = buffer.readInt32()
    const file_identifier_length = buffer.readInt64()
    const file_identifier = buffer.readString(Number(file_identifier_length))
    const file_version_length = buffer.readInt64()
    const file_version = buffer.readString(Number(file_version_length))
    const n_of_files = buffer.readInt64()
    return {
        data_offset,
        file_identifier_length,
        file_identifier,
        file_version_length,
        file_version,
        n_of_files
    }
}

export function writeHeader(data_offset: int32,n_of_files: int64)
{
    const buffer = new Writer(Buffer.alloc(0))
    
}