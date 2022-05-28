import { int32, Reader } from "../common";
import { FileInfo } from "./fileinfo";

export interface FileData
{
    running_offset: int32
    size: int32
    fdata: Buffer
    fileinfo: FileInfo
}

export function readFileData(buffer: Reader,fileinfo: FileInfo,__running_offset: int32): FileData
{
    const running_offset = __running_offset + (fileinfo.reference_alignment - (__running_offset % fileinfo.reference_alignment)) % fileinfo.reference_alignment
    buffer.offset = running_offset
    const size = fileinfo.reference_length
    const fdata = size > 0 ? buffer.slice(buffer.offset,buffer.offset + Number(size)).buf : Buffer.from([])
    return {
        size: Number(size),
        fdata,
        running_offset: running_offset + Number(fileinfo.reference_length),
        fileinfo
    }
}