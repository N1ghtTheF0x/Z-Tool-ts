"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFILE = void 0;
const common_1 = require("../common");
const pascal64string_1 = require("../pascal64string");
function readFILE(buffer) {
    const file_format_revision = (0, pascal64string_1.readPascal64string)(buffer);
    const nOfBones = buffer.readUInt64();
    const bones = [];
    for (var i = 0; i < nOfBones; i++)
        bones.push({
            name: (0, pascal64string_1.readPascal64string)(buffer),
            parentBone: buffer.readUInt32(),
            boneBaseMatrix: buffer.readArray(16, common_1.SignedBytes.float)
        });
    return {
        file_format_revision,
        nOfBones,
        bones
    };
}
exports.readFILE = readFILE;
