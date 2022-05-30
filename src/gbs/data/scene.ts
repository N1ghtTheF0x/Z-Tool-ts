import { float, uint32 } from "../../common";
import { FourCC } from "../constants";
import { FontData } from "./font";
import { MessageData } from "./message";
import { SoundData } from "./sound";
import { TextureData } from "./texture";
import { ViewData } from "./view";

export interface SceneData
{
    mFourCC: FourCC
    mDataSize: uint32
    mVersion: float
    mID: uint32
    mNumFonts: uint32
    mNumTextures: uint32
    mNumSounds: uint32
    mNumViews: uint32
    mNumMessages: uint32
    mFontsOffset: uint32
    mTexturesOffset: uint32
    mSoundsOffset: uint32
    mViewsOffset: uint32
    mMessagesOffset: uint32
    mBuffer: Buffer
    GetFontData(index: uint32): FontData
    GetTextureByIndex(index: uint32): TextureData
    GetTexture(textureID: uint32): TextureData
    GetSoundByIndex(index: uint32): SoundData
    GetSound(soundID: uint32): SoundData
    GetViewData(index: uint32): ViewData
    GetMessageData(messageId: uint32): MessageData
}