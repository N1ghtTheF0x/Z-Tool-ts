import { Reader } from "../common";
import { FileInfo, readFileInfo } from "./fileinfo";
import { Header } from "./header";

export interface Info
{
    files: FileInfo[]
}

export function readInfo(buffer: Reader,header: Readonly<Header>): Info
{
    const files: FileInfo[] = []
    for(var i = 0;i < header.n_of_files;i++)
        files.push(readFileInfo(buffer))
    return {
        files
    }
}