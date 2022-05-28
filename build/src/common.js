"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.object2string = exports.File = exports.Writer = exports.Reader = exports.Offset = exports.UnsignedBytes = exports.SignedBytes = void 0;
const fs_1 = require("fs");
var SignedBytes;
(function (SignedBytes) {
    SignedBytes[SignedBytes["byte"] = 1] = "byte";
    SignedBytes[SignedBytes["char"] = 1] = "char";
    SignedBytes[SignedBytes["int8"] = 1] = "int8";
    SignedBytes[SignedBytes["short"] = 2] = "short";
    SignedBytes[SignedBytes["int16"] = 2] = "int16";
    SignedBytes[SignedBytes["int"] = 4] = "int";
    SignedBytes[SignedBytes["long"] = 4] = "long";
    SignedBytes[SignedBytes["int32"] = 4] = "int32";
    SignedBytes[SignedBytes["quad"] = 8] = "quad";
    SignedBytes[SignedBytes["int64"] = 8] = "int64";
    SignedBytes[SignedBytes["float"] = 4] = "float";
    SignedBytes[SignedBytes["double"] = 8] = "double";
})(SignedBytes = exports.SignedBytes || (exports.SignedBytes = {}));
var UnsignedBytes;
(function (UnsignedBytes) {
    UnsignedBytes[UnsignedBytes["ubyte"] = 1] = "ubyte";
    UnsignedBytes[UnsignedBytes["uchar"] = 1] = "uchar";
    UnsignedBytes[UnsignedBytes["uint8"] = 1] = "uint8";
    UnsignedBytes[UnsignedBytes["ushort"] = 2] = "ushort";
    UnsignedBytes[UnsignedBytes["uint16"] = 2] = "uint16";
    UnsignedBytes[UnsignedBytes["uint"] = 4] = "uint";
    UnsignedBytes[UnsignedBytes["ulong"] = 4] = "ulong";
    UnsignedBytes[UnsignedBytes["uint32"] = 4] = "uint32";
    UnsignedBytes[UnsignedBytes["uquad"] = 8] = "uquad";
    UnsignedBytes[UnsignedBytes["uint64"] = 8] = "uint64";
})(UnsignedBytes = exports.UnsignedBytes || (exports.UnsignedBytes = {}));
class Offset {
    buf;
    offset = 0;
    endianess;
    constructor(buf, endianess = "big") {
        this.buf = buf;
        this.endianess = endianess;
    }
}
exports.Offset = Offset;
class Reader extends Offset {
    read(size) {
        const value = this.endianess == "big" ? this.buf.readIntBE(this.offset, size) : this.buf.readIntLE(this.offset, size);
        this.offset += size;
        return value;
    }
    readU(size) {
        const value = this.endianess == "big" ? this.buf.readUIntBE(this.offset, size) : this.buf.readUIntLE(this.offset, size);
        this.offset += size;
        return value;
    }
    readInt8() {
        return this.read(SignedBytes.int8);
    }
    readUInt8() {
        return this.readU(UnsignedBytes.uint8);
    }
    readByte() {
        return this.read(SignedBytes.byte);
    }
    readUByte() {
        return this.readU(UnsignedBytes.ubyte);
    }
    readChar() {
        return this.read(SignedBytes.char);
    }
    readUChar() {
        return this.readU(UnsignedBytes.uchar);
    }
    readInt16() {
        return this.read(SignedBytes.int16);
    }
    readUInt16() {
        return this.readU(UnsignedBytes.uint16);
    }
    readShort() {
        return this.read(SignedBytes.short);
    }
    readUShort() {
        return this.readU(UnsignedBytes.ushort);
    }
    readInt32() {
        return this.read(SignedBytes.int32);
    }
    readUInt32() {
        return this.readU(UnsignedBytes.uint32);
    }
    readInt() {
        return this.read(SignedBytes.int);
    }
    readUInt() {
        return this.readU(UnsignedBytes.uint);
    }
    readLong() {
        return this.read(SignedBytes.long);
    }
    readULong() {
        return this.readU(UnsignedBytes.ulong);
    }
    readInt64() {
        const value = this.endianess == "big" ? this.buf.readBigInt64BE(this.offset) : this.buf.readBigInt64LE(this.offset);
        this.offset += SignedBytes.int64;
        return value;
    }
    readUInt64() {
        const value = this.endianess == "big" ? this.buf.readBigUInt64BE(this.offset) : this.buf.readBigUInt64LE(this.offset);
        this.offset += UnsignedBytes.uint64;
        return value;
    }
    readQuad() {
        const value = this.endianess == "big" ? this.buf.readBigInt64BE(this.offset) : this.buf.readBigInt64LE(this.offset);
        this.offset += SignedBytes.quad;
        return value;
    }
    readUQuad() {
        const value = this.endianess == "big" ? this.buf.readBigUInt64BE(this.offset) : this.buf.readBigUInt64LE(this.offset);
        this.offset += UnsignedBytes.uquad;
        return value;
    }
    readFloat() {
        return this.read(SignedBytes.float);
    }
    readDouble() {
        return this.read(SignedBytes.double);
    }
    readString(length) {
        const a = this.readArray(length, SignedBytes.char);
        var s = "";
        for (const char of a) {
            s += String.fromCharCode(char);
        }
        return s;
    }
    readUString(length) {
        const a = this.readUArray(length, UnsignedBytes.uchar);
        var s = "";
        for (const char of a) {
            s += String.fromCharCode(char);
        }
        return s;
    }
    readArray(length, type = SignedBytes.byte) {
        var a = [];
        for (var pos = 0; pos < length; pos++)
            a.push(this.read(type));
        return a;
    }
    readUArray(length, type = UnsignedBytes.ubyte) {
        var a = [];
        for (var pos = 0; pos < length; pos++)
            a.push(this.readU(type));
        return a;
    }
    slice(start, end) {
        const buf = this.buf.slice(start, end);
        return new Reader(buf, this.endianess);
    }
}
exports.Reader = Reader;
class Writer extends Offset {
    write(value, size) {
        this.endianess == "big" ? this.buf.writeIntBE(value, this.offset, size) : this.buf.writeIntLE(value, this.offset, size);
        this.offset += size;
        return this;
    }
    writeU(value, size) {
        this.endianess == "big" ? this.buf.writeUIntBE(value, this.offset, size) : this.buf.writeUIntLE(value, this.offset, size);
        this.offset += size;
        return this;
    }
}
exports.Writer = Writer;
class File {
    path;
    mode;
    buffer;
    reader;
    writer;
    constructor(path, mode = "r") {
        this.path = path;
        this.mode = mode;
        this.buffer = (0, fs_1.readFileSync)(path);
        this.reader = mode == "r" || mode == "rw" ? new Reader(this.buffer) : new Reader(Buffer.from([]));
        this.writer = mode == "w" || mode == "rw" ? new Writer(this.buffer) : new Writer(Buffer.from([]));
    }
}
exports.File = File;
function object2string(obj) {
    return JSON.stringify(obj, (key, value) => {
        if (typeof value == "bigint")
            return `${value.toString()}n`;
        else if (value.constructor.name == "Reader" || value.constructor.name == "Buffer")
            return `Buffer`;
        else
            return value;
    });
}
exports.object2string = object2string;
