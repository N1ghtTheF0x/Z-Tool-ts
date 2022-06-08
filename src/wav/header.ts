import { char, long, Reader, SignedBytes } from "../common";

export interface Header
{
    groupID: Header.ID
    size: long
    riffType: Header.ID
}

export function Header(buffer: Reader): Header
{
    const groupID = Header.ID(buffer)
    const size = buffer.readLong()
    const riffType = Header.ID(buffer)

    return {
        groupID,
        size,
        riffType
    }
}

export namespace Header
{
    export type ID = [char,char,char,char]
    export function ID(buffer: Reader): ID
    {
        return buffer.readArray(4,SignedBytes.char) as ID
    }
}