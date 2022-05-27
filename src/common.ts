import { existsSync, readFileSync } from "fs"
import { basename, extname, resolve } from "path"

export type byte = number
export type ubyte = number
export type char = number
export type uchar = number

export type short = number
export type ushort = number
export type int16 = number
export type uint16 = number

export type long = number
export type ulong = number
export type int = number
export type uint = number
export type int32 = number
export type uint32 = number

export type quad = bigint
export type uquad = bigint
export type int64 = bigint
export type uint64 = bigint

export type float = number
export type double = number

export enum ReadOffsets
{
    byte = 1,
    ubyte = 1,
    char = byte,
    uchar = ubyte,
    short = 2,
    ushort = 2,
    int16 = short,
    uint16 = ushort,
    int32 = 4,
    uint32 = 4,
    int = int32,
    uint = uint32,
    long = int32,
    ulong = uint32,
    quad = 8,
    uquad = 8,
    int64 = quad,
    uint64 = uquad,
    float = 4,
    double = 8
}

export class Reader
{
    offset: number = 0
    readonly buf: Buffer
    endianess: Reader.Endianess
    constructor(buf: Buffer,endianess: Reader.Endianess = "big")
    {
        this.buf = buf
        this.endianess = endianess
    }
    read(size: ReadOffsets)
    {
        const value = this.endianess == "big" ? this.buf.readIntBE(this.offset,size) : this.buf.readIntLE(this.offset,size)
        this.offset += size
        return value
    }
    readU(size: ReadOffsets)
    {
        const value = this.endianess == "big" ? this.buf.readUIntBE(this.offset,size) : this.buf.readUIntLE(this.offset,size)
        this.offset += size
        return value
    }
    readByte(): byte
    {
        const value = this.buf.readInt8(this.offset)
        this.offset += ReadOffsets.byte
        return value
    }
    readUByte(): ubyte
    {
        const value = this.buf.readUInt8(this.offset)
        this.offset += ReadOffsets.ubyte
        return value
    }
    readChar(): char
    {
        const value = this.buf.readInt8(this.offset)
        this.offset += ReadOffsets.char
        return value
    }
    readUChar(): uchar
    {
        const value = this.buf.readUInt8(this.offset)
        this.offset += ReadOffsets.uchar
        return value
    }
    readInt16(): int16
    {
        const value = this.endianess == "big" ? this.buf.readInt16BE(this.offset) : this.buf.readInt16LE(this.offset)
        this.offset += ReadOffsets.int16
        return value
    }
    readUInt16(): int16
    {
        const value = this.endianess == "big" ? this.buf.readUInt16BE(this.offset) : this.buf.readUInt16LE(this.offset)
        this.offset += ReadOffsets.uint16
        return value
    }
    readShort(): short
    {
        const value = this.endianess == "big" ? this.buf.readInt16BE(this.offset) : this.buf.readInt16LE(this.offset)
        this.offset += ReadOffsets.short
        return value
    }
    readUShort(): ushort
    {
        const value = this.endianess == "big" ? this.buf.readUInt16BE(this.offset) : this.buf.readUInt16LE(this.offset)
        this.offset += ReadOffsets.ushort
        return value
    }
    readInt32(): int32
    {
        const value = this.endianess == "big" ? this.buf.readInt32BE(this.offset) : this.buf.readInt32LE(this.offset)
        this.offset += ReadOffsets.int32
        return value
    }
    readUInt32(): int32
    {
        const value = this.endianess == "big" ? this.buf.readUInt32BE(this.offset) : this.buf.readUInt32LE(this.offset)
        this.offset += ReadOffsets.uint32
        return value
    }
    readInt(): int
    {
        const value = this.endianess == "big" ? this.buf.readInt32BE(this.offset) : this.buf.readInt32LE(this.offset)
        this.offset += ReadOffsets.int
        return value
    }
    readUInt(): int
    {
        const value = this.endianess == "big" ? this.buf.readUInt32BE(this.offset) : this.buf.readUInt32LE(this.offset)
        this.offset += ReadOffsets.uint
        return value
    }
    readLong(): long
    {
        const value = this.endianess == "big" ? this.buf.readInt32BE(this.offset) : this.buf.readInt32LE(this.offset)
        this.offset += ReadOffsets.long
        return value
    }
    readULong(): ulong
    {
        const value = this.endianess == "big" ? this.buf.readUInt32BE(this.offset) : this.buf.readUInt32LE(this.offset)
        this.offset += ReadOffsets.ulong
        return value
    }
    readInt64(): int64
    {
        const value = this.endianess == "big" ? this.buf.readBigInt64BE(this.offset) : this.buf.readBigInt64LE(this.offset)
        this.offset += ReadOffsets.int64
        return value
    }
    readUInt64(): uint64
    {
        const value = this.endianess == "big" ? this.buf.readBigUInt64BE(this.offset) : this.buf.readBigUInt64LE(this.offset)
        this.offset += ReadOffsets.uint64
        return value
    }
    readQuad(): quad
    {
        const value = this.endianess == "big" ? this.buf.readBigInt64BE(this.offset) : this.buf.readBigInt64LE(this.offset)
        this.offset += ReadOffsets.quad
        return value
    }
    readUQuad(): uquad
    {
        const value = this.endianess == "big" ? this.buf.readBigUInt64BE(this.offset) : this.buf.readBigUInt64LE(this.offset)
        this.offset += ReadOffsets.uquad
        return value
    }
    readFloat(): float
    {
        const value = this.endianess == "big" ? this.buf.readFloatBE(this.offset) : this.buf.readFloatLE(this.offset)
        this.offset += ReadOffsets.float
        return value
    }
    readDouble(): double
    {
        const value = this.endianess == "big" ? this.buf.readDoubleBE(this.offset) : this.buf.readDoubleLE(this.offset)
        this.offset += ReadOffsets.double
        return value
    }
    readString(length: number)
    {
        const a = this.readArray(length,ReadOffsets.char)
        var s = ""
        for(const char of a)
        {
            s += String.fromCharCode(char)
        }
        return s
    }
    readUString(length: number)
    {
        const a = this.readUArray(length,ReadOffsets.uchar)
        var s = ""
        for(const char of a)
        {
            s += String.fromCharCode(char)
        }
        return s
    }
    readArray(length: number,type: ReadOffsets = ReadOffsets.byte)
    {
        var a = []
        for(var pos = 0;pos < length;pos++)
            a.push(this.read(type))
        return a
    }
    readUArray(length: number,type: ReadOffsets = ReadOffsets.ubyte)
    {
        var a = []
        for(var pos = 0;pos < length;pos++)
            a.push(this.readU(type))
        return a
    }
    slice(start: number,end: number)
    {
        const buf = this.buf.slice(start,end)
        return new Reader(buf,this.endianess)
    }
}
export namespace Reader
{
    export type Endianess = "little" | "big"
}

export function getPath(pos: number = 2)
{
    const file = process.argv[pos]
    const filename = basename(file,extname(file))
    const path = resolve(process.cwd(),file)

    if(!existsSync(path)) throw new Error(`File [${file}] does not exist!`)

    const buffer = readFileSync(path)
    const reader = new Reader(buffer)

    return {
        file,
        filename,
        path,
        buffer,
        reader
    }
}