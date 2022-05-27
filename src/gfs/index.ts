import { existsSync, mkdirSync, writeFileSync } from "fs"
import { dirname, resolve } from "path"
import { getPath } from "../common"
import { readData } from "./data"
import { readHeader } from "./header"
import { readInfo } from "./info"

const { path, file, filename, buffer, reader } = getPath()

const header = readHeader(reader)
const info = readInfo(reader,header)
const data = readData(reader,header,info)

writeFileSync(resolve(process.cwd(),`${filename}.json`),JSON.stringify({header,info,data},(key,value) => {
    if(typeof value == "bigint") return value.toString() + "n"
    else if(key == "fdata") return `Buffer`
    else return value
}))

const output_folder = resolve(process.cwd(),filename)

if(!existsSync(output_folder)) mkdirSync(output_folder)
for(const d of data.data)
{
    const path = resolve(output_folder,info.files[d.__index].reference_path)
    mkdirSync(dirname(path),{recursive: true})
    writeFileSync(path,d.fdata)
}