import { readFileSync } from "fs"
import { Reader } from "../common"
import { readData } from "./data"
import { Header, readHeader } from "./header"
import { Info, readInfo } from "./info"

export class GFS
{
    readonly header: Header
    readonly info: Info
    private reader: Reader
    constructor(readonly path: string)
    {
        this.reader = new Reader(readFileSync(this.path))
        this.header = this.__readHeader()
        this.info = this.__readInfo()
    }
    private __readHeader()
    {
        return readHeader(this.reader)
    }
    private __readInfo()
    {
        return readInfo(this.reader,this.header)
    }
    readData()
    {
        return readData(this.reader,this.header,this.info)
    }
}