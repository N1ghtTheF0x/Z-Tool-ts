import { readFileSync } from "fs"

export type byte = number
export type ubyte = number
export type char = number
export type uchar = number
export type int8 = number
export type uint8 = number

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

export type ustring = string

export enum SignedBytes
{
    byte = 1,
    char = byte,
    int8 = byte,

    short = 2,
    int16 = short,

    int = 4,
    long = int,
    int32 = int,

    quad = 8,
    int64 = quad,

    float = 4,
    double = 8
}

export enum UnsignedBytes
{
    ubyte = 1,
    uchar = ubyte,
    uint8 = ubyte,

    ushort = 2,
    uint16 = ushort,

    uint = 4,
    ulong = uint,
    uint32 = uint,

    uquad = 8,
    uint64 = uquad
}

export type Bytes = SignedBytes | UnsignedBytes

export abstract class Offset
{
    offset: number = 0
    endianess: Offset.Endianess
    constructor(readonly buf: Buffer,endianess: Offset.Endianess = "big")
    {
        this.endianess = endianess
    }
}
export namespace Offset
{
    export type Endianess = "little" | "big"
}

export class Reader extends Offset
{
    read(size: SignedBytes)
    {
        const value = this.endianess == "big" ? this.buf.readIntBE(this.offset,size) : this.buf.readIntLE(this.offset,size)
        this.offset += size
        return value
    }
    readU(size: UnsignedBytes)
    {
        const value = this.endianess == "big" ? this.buf.readUIntBE(this.offset,size) : this.buf.readUIntLE(this.offset,size)
        this.offset += size
        return value
    }
    readInt8(): int8
    {
        return this.read(SignedBytes.int8)
    }
    readUInt8(): uint8
    {
        return this.readU(UnsignedBytes.uint8)
    }
    readByte(): byte
    {
        return this.read(SignedBytes.byte)
    }
    readUByte(): ubyte
    {
        return this.readU(UnsignedBytes.ubyte)
    }
    readChar(): char
    {
        return this.read(SignedBytes.char)
    }
    readUChar(): uchar
    {
        return this.readU(UnsignedBytes.uchar)
    }
    readInt16(): int16
    {
        return this.read(SignedBytes.int16)
    }
    readUInt16(): int16
    {
        return this.readU(UnsignedBytes.uint16)
    }
    readShort(): short
    {
        return this.read(SignedBytes.short)
    }
    readUShort(): ushort
    {
        return this.readU(UnsignedBytes.ushort)
    }
    readInt32(): int32
    {
        return this.read(SignedBytes.int32)
    }
    readUInt32(): uint32
    {
        return this.readU(UnsignedBytes.uint32)
    }
    readInt(): int
    {
        return this.read(SignedBytes.int)
    }
    readUInt(): uint
    {
        return this.readU(UnsignedBytes.uint)
    }
    readLong(): long
    {
        return this.read(SignedBytes.long)
    }
    readULong(): ulong
    {
        return this.readU(UnsignedBytes.ulong)
    }
    readInt64(): int64
    {
        const value = this.endianess == "big" ? this.buf.readBigInt64BE(this.offset) : this.buf.readBigInt64LE(this.offset)
        this.offset += SignedBytes.int64
        return value
    }
    readUInt64(): uint64
    {
        const value = this.endianess == "big" ? this.buf.readBigUInt64BE(this.offset) : this.buf.readBigUInt64LE(this.offset)
        this.offset += UnsignedBytes.uint64
        return value
    }
    readQuad(): quad
    {
        const value = this.endianess == "big" ? this.buf.readBigInt64BE(this.offset) : this.buf.readBigInt64LE(this.offset)
        this.offset += SignedBytes.quad
        return value
    }
    readUQuad(): uquad
    {
        const value = this.endianess == "big" ? this.buf.readBigUInt64BE(this.offset) : this.buf.readBigUInt64LE(this.offset)
        this.offset += UnsignedBytes.uquad
        return value
    }
    readFloat(): float
    {
        return this.read(SignedBytes.float)
    }
    readDouble(): double
    {
        return this.read(SignedBytes.double)
    }
    readString(length: number): string
    {
        const a = this.readArray(length,SignedBytes.char)
        var s = ""
        for(const char of a)
        {
            s += String.fromCharCode(char)
        }
        return s
    }
    readUString(length: number): ustring
    {
        const a = this.readUArray(length,UnsignedBytes.uchar)
        var s = ""
        for(const char of a)
        {
            s += String.fromCharCode(char)
        }
        return s
    }
    readArray(length: number,type: SignedBytes = SignedBytes.byte)
    {
        var a = []
        for(var pos = 0;pos < length;pos++)
            a.push(this.read(type))
        return a
    }
    readUArray(length: number,type: UnsignedBytes = UnsignedBytes.ubyte)
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

export class Writer extends Offset
{
    write(value: number,size: SignedBytes)
    {
        this.endianess == "big" ? this.buf.writeIntBE(value,this.offset,size) : this.buf.writeIntLE(value,this.offset,size)
        this.offset += size
        return this
    }
    writeU(value: number,size: UnsignedBytes)
    {
        this.endianess == "big" ? this.buf.writeUIntBE(value,this.offset,size) : this.buf.writeUIntLE(value,this.offset,size)
        this.offset += size
        return this
    }
    writeInt8(value: int8)
    {
        return this.write(value,SignedBytes.int8)
    }
    writeUInt8(value: uint8)
    {
        return this.writeU(value,UnsignedBytes.uint8)
    }
    writeByte(value: byte)
    {
        return this.write(value,SignedBytes.byte)
    }
    writeUByte(value: ubyte)
    {
        return this.writeU(value,UnsignedBytes.ubyte)
    }
    writeChar(value: char)
    {
        return this.write(value,SignedBytes.char)
    }
    writeUChar(value: uchar)
    {
        return this.writeU(value,UnsignedBytes.uchar)
    }
    writeInt16(value: int16)
    {
        return this.write(value,SignedBytes.int16)
    }
    writeUInt16(value: uint16)
    {
        return this.writeU(value,UnsignedBytes.uint16)
    }
    writeInt32(value: int32)
    {
        return this.write(value,SignedBytes.int32)
    }
    writeUInt32(value: uint32)
    {   
        return this.writeU(value,UnsignedBytes.uint32)
    }
    writeInt64(value: int64)
    {
        this.endianess == "big" ? this.buf.writeBigInt64BE(value,this.offset) : this.buf.writeBigInt64LE(value,this.offset)
        this.offset += SignedBytes.int64
        return this
    }
    writeUInt64(value: uint64)
    {
        this.endianess == "big" ? this.buf.writeBigUInt64BE(value,this.offset) : this.buf.writeBigUInt64LE(value,this.offset)
        this.offset += UnsignedBytes.uint64
        return this
    }
}

export class File
{
    private buffer: Buffer
    protected reader: Reader
    protected writer: Writer
    constructor(readonly path: string,readonly mode: File.Mode = "r")
    {
        this.buffer = readFileSync(path)
        this.reader = mode == "r" || mode == "rw" ? new Reader(this.buffer) : new Reader(Buffer.from([]))
        this.writer = mode == "w" || mode == "rw" ? new Writer(this.buffer) : new Writer(Buffer.from([]))
    }
}
export namespace File
{
    export type Mode = "r" | "w" | "rw"
}

export function object2string(obj: any)
{
    return JSON.stringify(obj,(key,value) => {
        if(typeof value == "bigint") return `${value.toString()}n`
        else if(value?.type == "Buffer") return "Buffer"
        else return value
    },"\t")
}