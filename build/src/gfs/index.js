"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GFS = void 0;
const common_1 = require("../common");
const data_1 = require("./data");
const header_1 = require("./header");
const info_1 = require("./info");
class GFS extends common_1.File {
    path;
    header;
    info;
    constructor(path) {
        super(path);
        this.path = path;
        this.header = this.__readHeader();
        this.info = this.__readInfo();
    }
    __readHeader() {
        return (0, header_1.readHeader)(this.reader);
    }
    __readInfo() {
        return (0, info_1.readInfo)(this.reader, this.header);
    }
    readData() {
        return (0, data_1.readData)(this.reader, this.header, this.info);
    }
}
exports.GFS = GFS;
