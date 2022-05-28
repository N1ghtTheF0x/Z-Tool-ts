"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFontTableHeader = void 0;
const chardata_1 = require("./chardata");
function readFontTableHeader(buffer) {
    const GFNT = buffer.readString(4);
    const Font_Length = buffer.readUInt();
    const Font_ID = buffer.readUInt();
    const Font_Name = buffer.readString(64);
    const Font_Size = buffer.readUInt();
    const Atlas_Width = buffer.readUInt();
    const Atlas_Height = buffer.readUInt();
    const MaxTop = buffer.readUInt();
    const Atlas_Count = buffer.readUInt();
    const Chars_Count = buffer.readUInt();
    const chb = {
        chsd: []
    };
    for (var i = 0; i < Chars_Count; i++)
        chb.chsd.push((0, chardata_1.readCharData)(buffer));
    return {
        GFNT,
        Font_Length,
        Font_ID,
        Font_Name,
        Font_Size,
        Atlas_Width,
        Atlas_Height,
        MaxTop,
        Atlas_Count,
        Chars_Count,
        chb
    };
}
exports.readFontTableHeader = readFontTableHeader;
