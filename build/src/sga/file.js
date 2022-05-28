"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFILE = exports.FILE = void 0;
const pascal64string_1 = require("../pascal64string");
const uvtrack_1 = require("./uvtrack");
var FILE;
(function (FILE) {
    function readBONE(buffer) {
        const boneName = (0, pascal64string_1.readPascal64string)(buffer);
        const length = buffer.readUInt64();
        const unknownData = [];
        for (var i = 0; i < length; i++)
            unknownData.push({
                a: buffer.readFloat(),
                b: buffer.readFloat(),
                c: buffer.readFloat()
            });
        const length2 = buffer.readUInt64();
        const unknownData2 = [];
        for (var i = 0; i < length2; i++)
            unknownData2.push({
                a1: buffer.readFloat(),
                b1: buffer.readFloat(),
                c1: buffer.readFloat(),
                d1: buffer.readFloat()
            });
        const length3 = buffer.readUInt64();
        const unknownData3 = [];
        for (var i = 0; i < length3; i++)
            unknownData3.push({
                a2: buffer.readFloat(),
                b2: buffer.readFloat(),
                c2: buffer.readFloat()
            });
        return {
            boneName,
            length,
            unknownData,
            length2,
            unknownData2,
            length3,
            unknownData3
        };
    }
    FILE.readBONE = readBONE;
    function readUV_TRACKS(buffer) {
        const type = (0, pascal64string_1.readPascal64string)(buffer);
        const track = (0, uvtrack_1.readUV_TRACK)(buffer);
        return {
            type,
            track
        };
    }
    FILE.readUV_TRACKS = readUV_TRACKS;
})(FILE = exports.FILE || (exports.FILE = {}));
function readFILE(buffer) {
    const file_format_revision = (0, pascal64string_1.readPascal64string)(buffer);
    const unknownNumber = buffer.readUInt32();
    const nOfElements = buffer.readInt64();
    const nOfUVTracks = buffer.readInt64();
    const animationLengthInSeconds = buffer.readFloat();
    const bone = [];
    for (var i = 0; i < nOfElements; i++)
        bone.push(FILE.readBONE(buffer));
    const uv_tracks = [];
    for (var i = 0; i < nOfUVTracks; i++)
        uv_tracks.push(FILE.readUV_TRACKS(buffer));
    return {
        file_format_revision,
        unknownNumber,
        nOfElements,
        nOfUVTracks,
        animationLengthInSeconds,
        bone,
        uv_tracks
    };
}
exports.readFILE = readFILE;
