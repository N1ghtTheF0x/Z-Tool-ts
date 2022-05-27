import { getPath } from "../common";
import { readFontTableHeader } from "./fonttableheader";
import { readHeader } from "./header";

const { reader } = getPath()

const header = readHeader(reader)
const fonttables = []

reader.endianess = "little"



try
{
    while(true)
    {
        const tag = reader.readUInt()
        if(tag == 0x47464E54)
        {
            const fth = readFontTableHeader(reader)
            fonttables.push(fth)
        }
    }
}
catch(e)
{
    const res = {
        header,
        fonttables
    }
    console.dir(res)
}