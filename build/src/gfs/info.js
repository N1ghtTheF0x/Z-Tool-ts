"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readInfo = void 0;
const fileinfo_1 = require("./fileinfo");
function readInfo(buffer, header) {
    const files = [];
    for (var i = 0; i < header.n_of_files; i++)
        files.push((0, fileinfo_1.readFileInfo)(buffer));
    return {
        files
    };
}
exports.readInfo = readInfo;
