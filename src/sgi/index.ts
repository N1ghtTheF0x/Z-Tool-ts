import { readFileSync } from "fs";
import { Reader } from "../common";
import { FILE, readFILE } from "./file";

export class SGI
{
    readonly file: FILE
    constructor(readonly path: string)
    {
        const reader = new Reader(readFileSync(path))
        this.file = this.__readFile(reader)
    }
    private __readFile(buffer: Reader)
    {
        return readFILE(buffer)
    }
}