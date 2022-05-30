import { existsSync, mkdirSync, writeFileSync } from "fs";
import { basename, dirname, extname, resolve } from "path";
import { File, object2string } from "./common";
import { GBS } from "./gbs/old";
import { GFS } from "./gfs";
import { SGA } from "./sga";
import { SGI } from "./sgi";
import { SGM } from "./sgm";
import { SGS } from "./sgs";

type FileType = "gbs" | "gfs" | "sga" | "sgi" | "sgm" | "sgs"
type ActionType = "pack" | "unpack" | "analyse"

export function main()
{
    if(process.argv.length == 2 || (process.argv.includes("-h") || process.argv.includes("--help")))
    {
        console.info(`Z-Tool by N1ghtTheF0x

        Usage: z-tool-<os> <pack|unpack|analyse> <gbs|gfs|sga|sgi|sgm|sgs> <path> [<output>]
        Example: z-tool-win unpack gfs levels.gfs levels_extracted`)
        process.exit(0)
    }
    const actionType = process.argv[2] as ActionType
    const fileType = process.argv[3] as FileType
    const file = process.argv[4]
    const outputFolder = process.argv[5] ?? "output"

    const oFolder = resolve(process.cwd(),outputFolder)
    const fpath = resolve(process.cwd(),file)
    const filename = basename(file,extname(file))
    var obj: File
    switch(fileType)
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
    if(actionType == "analyse")
    {
        writeFileSync(resolve(process.cwd(),`${filename}.json`),object2string(obj),"utf-8")
        process.exit(0)
    }
    if(obj instanceof GFS)
    {
        const gfs: GFS = obj
        if(actionType == "unpack")
        {
            const data = gfs.readData()
            for(const filedata of data.data)
            {
                const filepath = resolve(oFolder,filedata.fileinfo.reference_path)
                const dirpath = dirname(filepath)
                if(!existsSync(dirpath)) mkdirSync(dirpath,{recursive:true})
                writeFileSync(filepath,filedata.fdata)
            }
        }
        else if(actionType == "pack")
        {
            throw new Error("Not Implemented yet!")
        }
    }
    process.exit(0)
}

