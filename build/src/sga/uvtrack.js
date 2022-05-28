"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readUV_TRACK = exports.UV_TRACK = void 0;
var UV_TRACK;
(function (UV_TRACK) {
    function readUV_COORDS(buffer) {
        return {
            u: buffer.readFloat(),
            v: buffer.readFloat()
        };
    }
    UV_TRACK.readUV_COORDS = readUV_COORDS;
    function readUNKNOWN(buffer) {
        return {
            unknownData: buffer.readString(4)
        };
    }
    UV_TRACK.readUNKNOWN = readUNKNOWN;
    function readTIME(buffer) {
        return {
            u: buffer.readFloat(),
            v: buffer.readFloat()
        };
    }
    UV_TRACK.readTIME = readTIME;
})(UV_TRACK = exports.UV_TRACK || (exports.UV_TRACK = {}));
function readUV_TRACK(buffer) {
    const nOfAnimationFrames = buffer.readUInt64();
    const track = [];
    for (var i = 0; i < nOfAnimationFrames; i++)
        track.push(UV_TRACK.readUV_COORDS(buffer));
    const nOfUnknown1 = buffer.readUInt64();
    const unknown = [];
    for (var i = 0; i < nOfUnknown1; i++)
        unknown.push(UV_TRACK.readUNKNOWN(buffer));
    const nOfTime = buffer.readUInt64();
    const time = [];
    for (var i = 0; i < nOfTime; i++)
        time.push(UV_TRACK.readTIME(buffer));
    return {
        nOfAnimationFrames,
        track,
        nOfUnknown1,
        unknown,
        nOfTime,
        time
    };
}
exports.readUV_TRACK = readUV_TRACK;
