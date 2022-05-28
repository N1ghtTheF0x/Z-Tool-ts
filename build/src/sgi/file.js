"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFILE = exports.FILE = void 0;
const pascal64string_1 = require("../pascal64string");
var FILE;
(function (FILE) {
    function readELEMENT(buffer) {
        const elementName = (0, pascal64string_1.readPascal64string)(buffer);
        const shapeName = (0, pascal64string_1.readPascal64string)(buffer);
        const unknown = [];
        for (var i = 0; i < 16; i++)
            unknown.push(buffer.readFloat());
        const unknown2 = buffer.readString(2);
        const nOfAnimations = buffer.readUInt64();
        const animation = [];
        for (var i = 0; i < nOfAnimations; i++)
            animation.push({
                animationName: (0, pascal64string_1.readPascal64string)(buffer),
                animationFileName: (0, pascal64string_1.readPascal64string)(buffer)
            });
        return {
            elementName,
            shapeName,
            unknown,
            unknown2,
            nOfAnimations,
            animation
        };
    }
    FILE.readELEMENT = readELEMENT;
})(FILE = exports.FILE || (exports.FILE = {}));
function readFILE(buffer) {
    const file_format_revision = (0, pascal64string_1.readPascal64string)(buffer);
    const nOfElements = buffer.readUInt64();
    const element = [];
    for (var i = 0; i < nOfElements; i++)
        element.push(FILE.readELEMENT(buffer));
    return {
        file_format_revision,
        nOfElements,
        element
    };
}
exports.readFILE = readFILE;
