"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readPascal64string = void 0;
function readPascal64string(buffer) {
    const count = buffer.readUInt64();
    const chars = buffer.readString(Number(count));
    return {
        count,
        chars
    };
}
exports.readPascal64string = readPascal64string;
