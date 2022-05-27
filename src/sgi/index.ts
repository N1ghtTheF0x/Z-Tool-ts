import { getPath } from "../common";
import { readFILE } from "./file";

const { reader } = getPath()

const file = readFILE(reader)

console.dir(file,{depth:99})