import { float, Reader, uint } from "../common"

export interface Header
{
    GGSC: string
    LayoutSize1: uint
    Data_Version: float
    Scene_ID: uint
    Fonts_Count: uint
    Textures_Count: uint
    Sounds_Count: uint
    Views_Count: uint
    Messages_Count: uint
    UnknownData: uint
    LayoutSize2: uint
    LayoutSize3: uint
    LayoutSize4: uint
    LayoutSize5: uint
}

export function readHeader(buffer: Reader): Header
{
    const GGSC = buffer.readString(4)
    const LayoutSize1 = buffer.readUInt()
    const Data_Version = buffer.readFloat()
    const Scene_ID = buffer.readUInt()
    const Fonts_Count = buffer.readUInt()
    const Textures_Count = buffer.readUInt()
    const Sounds_Count = buffer.readUInt()
    const Views_Count = buffer.readUInt()
    const Messages_Count = buffer.readUInt()
    const UnknownData = buffer.readUInt()
    const LayoutSize2 = buffer.readUInt()
    const LayoutSize3 = buffer.readUInt()
    const LayoutSize4 = buffer.readUInt()
    const LayoutSize5 = buffer.readUInt()
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
    }
}