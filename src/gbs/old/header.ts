import { float, int32, Reader } from "../../common"

export interface Header
{
    FourCC: string
    FileLength: int32
    Data_Version: float
    Scene_ID: int32
    Fonts_Count: int32
    Textures_Count: int32
    Sounds_Count: int32
    Views_Count: int32
    Messages_Count: int32
    fontOffsetPos: int32
    textureOffsetPos: int32
    soundOffsetPos: int32
    viewDataOffsetPos: int32
    msgDataOffset: int32
}

export function readHeader(buffer: Reader): Header
{
    const FourCC = buffer.readString(4)
    const FileLength = buffer.readInt32()
    const Data_Version = buffer.readFloat()
    const Scene_ID = buffer.readInt32()
    const Fonts_Count = buffer.readInt32()
    const Textures_Count = buffer.readInt32()
    const Sounds_Count = buffer.readInt32()
    const Views_Count = buffer.readInt32()
    const Messages_Count = buffer.readInt32()
    const fontOffsetPos = buffer.readInt32()
    const textureOffsetPos = buffer.readInt32()
    const soundOffsetPos = buffer.readInt32()
    const viewDataOffsetPos = buffer.readInt32()
    const msgDataOffset = buffer.readInt32()
    return {
        FourCC,
        FileLength,
        Data_Version,
        Scene_ID,
        Fonts_Count,
        Textures_Count,
        Sounds_Count,
        Views_Count,
        Messages_Count,
        fontOffsetPos,
        textureOffsetPos,
        soundOffsetPos,
        viewDataOffsetPos,
        msgDataOffset
    }
}