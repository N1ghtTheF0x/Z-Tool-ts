import { File } from "../common";
import { FILE, readFILE } from "./file";

export class SGA extends File
{
    readonly file: FILE
    constructor(readonly path: string)
    {
        super(path)
        this.file = this.__readFile()
    }
    private __readFile()
    {
        return readFILE(this.reader)
    }
}