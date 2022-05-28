"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readData = void 0;
const filedata_1 = require("./filedata");
function readData(buffer, header, info) {
    const data = [];
    const fs = {
        running_offset: header.data_offset
    };
    for (var i = 0; i < header.n_of_files; i++) {
        const datar = (0, filedata_1.readFileData)(buffer, info.files[i], fs.running_offset);
        fs.running_offset = datar.running_offset;
        data.push(datar);
    }
    return {
        data,
        fs
    };
}
exports.readData = readData;
