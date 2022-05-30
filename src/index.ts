import { existsSync, mkdirSync, writeFileSync } from "fs";
import { basename, dirname, extname, resolve } from "path";
import { File, object2string } from "./common";
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

if(process.argv.length == 2 || (process.argv.includes("-h") || process.argv.includes("--help")))
{
    console.info(`Z-Tool by N1ghtTheF0x\n\nUsage: z-tool-<os> <gbs|gfs|sga|sgi|sgm|sgs> <path> [<output>]\nExample: z-tool-win gfs levels.gfs levels_extracted`)
    process.exit(0)
}

const file = process.argv[3]
const unpackType = process.argv[2] ?? "gfs"
const outputFolder = process.argv[4] ?? "output"

if(unpackTypes.includes(unpackType))
{
    const oFolder = resolve(process.cwd(),outputFolder)
    const fpath = resolve(process.cwd(),file)
    const filename = basename(file,extname(file))
    var obj: File
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
            obj = {} as File
            break
    }
    if(obj instanceof GFS)
    {
        const gfs: GFS = obj
        const data = gfs.readData()
        for(const filedata of data.data)
        {
            const filepath = resolve(oFolder,filedata.fileinfo.reference_path)
            const dirpath = dirname(filepath)
            if(!existsSync(dirpath)) mkdirSync(dirpath,{recursive:true})
            writeFileSync(filepath,filedata.fdata)
        }
    }
    else
    {
        writeFileSync(resolve(process.cwd(),`${filename}.json`),object2string(obj),"utf-8")
    }
    process.exit(0)
}