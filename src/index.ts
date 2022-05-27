import { writeFileSync } from "fs";
import { basename, extname, resolve } from "path";
import { object2string } from "./common";
import { GBS } from "./gbs";
import { GFS } from "./gfs";
import { SGA } from "./sga";
import { SGI } from "./sgi";
import { SGM } from "./sgm";
import { SGS } from "./sgs";

const unpackTypes: ReadonlyArray<string> = [
    "gbs",
    "gfs",
    "sga",
    "sgi",
    "sgm",
    "sgs"
]

const file = process.argv[3]
const unpackType = process.argv[2] ?? "gfs"
const outputFolder = process.argv[4] ?? "output"

if(unpackTypes.includes(unpackType))
{
    const oFolder = resolve(process.cwd(),outputFolder)
    const fpath = resolve(process.cwd(),file)
    const filename = basename(file,extname(file))
    var obj: any
    switch(unpackType)
    {
        case "gfs":
        {
            obj = new GFS(fpath)
            break
        }
        case "gbs":
        {
            obj = new GBS(fpath)
            break
        }
        case "sga":
        {
            obj = new SGA(fpath)
            break
        }
        case "sgi":
        {
            obj = new SGI(fpath)
            break
        }
        case "sgm":
        {
            obj = new SGM(fpath)
            break
        }
        case "sgs":
        {
            obj = new SGS(fpath)
            break
        }
        default:
            obj = {}
            break
    }
    writeFileSync(resolve(process.cwd(),`${filename}.json`),object2string(obj),"utf-8")
}