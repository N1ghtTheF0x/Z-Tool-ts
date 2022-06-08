import { File } from "../common";
import { FILE } from "./file";

export class Wav extends File
{
    readonly file: FILE
    constructor(readonly path: string)
    {
        super(path)
        this.reader.endianess = "little"
        this.writer.endianess = "little"
        this.file = this.__readFile()
    }
    private __readFile()
    {
        return FILE(this.reader)
    }
}