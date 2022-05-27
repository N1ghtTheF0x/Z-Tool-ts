import { int32, Reader } from "../common";
import { FileData, readFileData } from "./filedata";
import { Header } from "./header";
import { Info } from "./info";

export interface Data
{
    data: FileData[]
    fs: Data.FileStruct
}

export namespace Data
{
    export interface FileStruct
    {
        running_offset: int32
    }
}

export function readData(buffer: Reader,header: Readonly<Header>,info: Info): Data
{
    const data: FileData[] = []
    const fs: Data.FileStruct = {
        running_offset: header.data_offset
    }
    var running_offset = header.data_offset
    for(var i = 0;i < header.n_of_files;i++)
    {
        const datar = readFileData(buffer,i,info,running_offset)
        running_offset = datar.__running_offset
        fs.running_offset = running_offset
        data.push({
            size: datar.size,
            fdata: datar.fdata,
            __index: i
        })
    }
    return {
        data,
        fs
    }
}