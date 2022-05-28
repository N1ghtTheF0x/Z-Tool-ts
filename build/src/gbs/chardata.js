"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCharData = void 0;
function readCharData(buffer) {
    const Char_Code = buffer.readString(4);
    const igf = buffer.readUInt();
    const Char_X_Offs = buffer.readUInt();
    const Char_Y_Offs = buffer.readUInt();
    const Char_Width = buffer.readUInt();
    const Char_Height = buffer.readUInt();
    const Char_Top = buffer.readUInt();
    const Char_Advance = buffer.readUInt();
    const Char_LeftBearing = buffer.readUInt();
    const Char_Atlas_Index = buffer.readUInt();
    return {
        Char_Code,
        igf,
        Char_X_Offs,
        Char_Y_Offs,
        Char_Width,
        Char_Height,
        Char_Top,
        Char_Advance,
        Char_LeftBearing,
        Char_Atlas_Index
    };
}
exports.readCharData = readCharData;
