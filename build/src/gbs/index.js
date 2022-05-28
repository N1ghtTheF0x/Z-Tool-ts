"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GBS = void 0;
const common_1 = require("../common");
const fonttableheader_1 = require("./fonttableheader");
const header_1 = require("./header");
class GBS extends common_1.File {
    path;
    header;
    fonttables;
    constructor(path) {
        super(path);
        this.path = path;
        this.header = this.__readHeader();
        this.fonttables = this.__readfth();
    }
    __readHeader() {
        return (0, header_1.readHeader)(this.reader);
    }
    __readfth() {
        const fonttables = [];
        this.reader.endianess = "little";
        try {
            const tag = this.reader.readUInt();
            if (tag == 0x47464E54) {
                const fth = (0, fonttableheader_1.readFontTableHeader)(this.reader);
                fonttables.push(fth);
            }
        }
        catch (e) {
        }
        this.reader.endianess = "big";
        return fonttables;
    }
}
exports.GBS = GBS;
