"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHeader = void 0;
function readHeader(buffer) {
    const GGSC = buffer.readString(4);
    const LayoutSize1 = buffer.readUInt();
    const Data_Version = buffer.readFloat();
    const Scene_ID = buffer.readUInt();
    const Fonts_Count = buffer.readUInt();
    const Textures_Count = buffer.readUInt();
    const Sounds_Count = buffer.readUInt();
    const Views_Count = buffer.readUInt();
    const Messages_Count = buffer.readUInt();
    const UnknownData = buffer.readUInt();
    const LayoutSize2 = buffer.readUInt();
    const LayoutSize3 = buffer.readUInt();
    const LayoutSize4 = buffer.readUInt();
    const LayoutSize5 = buffer.readUInt();
    return {
        GGSC,
        LayoutSize1,
        Data_Version,
        Scene_ID,
        Fonts_Count,
        Textures_Count,
        Sounds_Count,
        Views_Count,
        Messages_Count,
        UnknownData,
        LayoutSize2,
        LayoutSize3,
        LayoutSize4,
        LayoutSize5
    };
}
exports.readHeader = readHeader;
