"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFileData = void 0;
function readFileData(buffer, fileinfo, __running_offset) {
    const running_offset = __running_offset + (fileinfo.reference_alignment - (__running_offset % fileinfo.reference_alignment)) % fileinfo.reference_alignment;
    buffer.offset = running_offset;
    const size = fileinfo.reference_length;
    const fdata = size > 0 ? buffer.slice(buffer.offset, buffer.offset + Number(size)).buf : Buffer.from([]);
    return {
        size: Number(size),
        fdata,
        running_offset: running_offset + Number(fileinfo.reference_length),
        fileinfo
    };
}
exports.readFileData = readFileData;
