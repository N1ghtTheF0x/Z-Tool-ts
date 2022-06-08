import { Reader, UnsignedBytes } from "../common";
import { CueChunk } from "./cuechunk";
import { DataChunk } from "./datachunk";
import { FactChunk } from "./factchunk";
import { FormatChunk } from "./formatchunk";
import { Header } from "./header";
import { ListChunk } from "./listchunk";
import { UnknownChunk } from "./unknownchunk";

export interface FILE
{
    header: Header
    // tag = string
    // size = uint
    chunks: any[]
}

export function FILE(buffer: Reader): FILE
{
    const header = Header(buffer)
    const chunks = []
    var tag = ""
    var format: FormatChunk | null = null
    try
    {
        tag = buffer.buf.toString("ascii",buffer.offset,buffer.offset+4)
        switch(tag)
        {
            case "fmt ":
                format = FormatChunk(buffer)
                chunks.push(format)
                break
            case "data":
                if(format == null) break
                chunks.push(DataChunk(buffer,format))
                break
            case "fact":
                chunks.push(FactChunk(buffer))
                break
            case "cue ":
                chunks.push(CueChunk(buffer))
                break
            case "LIST":
                chunks.push(ListChunk(buffer))
                break
            default:
                chunks.push(UnknownChunk(buffer))
                break
        }
    }
    catch(e)
    {
        
    }
    return {
        header,
        chunks
    }
}