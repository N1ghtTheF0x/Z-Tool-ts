"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFileInfo = void 0;
function readFileInfo(buffer) {
    const file_path_length = buffer.readInt64();
    const reference_path = buffer.readString(Number(file_path_length));
    const reference_length = buffer.readInt64();
    const reference_alignment = buffer.readInt32();
    return {
        file_path_length,
        reference_path,
        reference_length,
        reference_alignment
    };
}
exports.readFileInfo = readFileInfo;
