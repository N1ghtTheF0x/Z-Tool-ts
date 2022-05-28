"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHeader = void 0;
function readHeader(buffer) {
    const data_offset = buffer.readInt32();
    const file_identifier_length = buffer.readInt64();
    const file_identifier = buffer.readString(Number(file_identifier_length));
    const file_version_length = buffer.readInt64();
    const file_version = buffer.readString(Number(file_version_length));
    const n_of_files = buffer.readInt64();
    return {
        data_offset,
        file_identifier_length,
        file_identifier,
        file_version_length,
        file_version,
        n_of_files
    };
}
exports.readHeader = readHeader;
