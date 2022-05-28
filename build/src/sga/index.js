"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SGA = void 0;
const common_1 = require("../common");
const file_1 = require("./file");
class SGA extends common_1.File {
    path;
    file;
    constructor(path) {
        super(path);
        this.path = path;
        this.file = this.__readFile();
    }
    __readFile() {
        return (0, file_1.readFILE)(this.reader);
    }
}
exports.SGA = SGA;
