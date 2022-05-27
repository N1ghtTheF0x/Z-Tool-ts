import { float, Reader, SignedBytes, UnsignedBytes, short, uchar, uint64 } from "../common";
import { Pascal64string, readPascal64string } from "../pascal64string";

export interface FILE
{
    file_format_revision: Pascal64string
    textureName: Pascal64string
    unknown1: float[] // 13
    dataFormat: Pascal64string
    dataFormatLengthPerPolygon: uint64
    nOfPolygons: uint64
    nOfTriangles: uint64
    nOfBones: uint64
    polygon: FILE.POLYGON[]
    triangle: FILE.TRIANGLE[]
    model_data: FILE.DATA
    bone_name: FILE.BONE_NAMES
    bone_properties: FILE.BONE_PROPERTIES[]
}

export namespace FILE
{
    export interface POLYGON
    {
        data: uchar[]
    }
    export interface TRIANGLE
    {
        firstPolygonIndex: short
        secondPolygonIndex: short
        thirdPolygonIndex: short
    }
    export interface DATA
    {
        xPos: float
        yPos: float
        zPos: float
        xRot: float
        yRot: float
        zRot: float
    }
    export interface BONE_NAMES
    {
        boneName: Pascal64string[]
    }
    export interface BONE_PROPERTIES
    {
        unknown3: float[] // 16
    }
}

export function readFILE(buffer: Reader): FILE
{
    const file_format_revision = readPascal64string(buffer)
    const textureName = readPascal64string(buffer)
    const unknown1 = buffer.readArray(13,SignedBytes.float)
    const dataFormat = readPascal64string(buffer)
    const dataFormatLengthPerPolygon = buffer.readUInt64()
    const nOfPolygons = buffer.readUInt64()
    const nOfTriangles = buffer.readUInt64()
    const nOfBones = buffer.readUInt64()
    const polygon: FILE.POLYGON[] = []
    for(var i = 0;i < nOfPolygons;i++)
        polygon.push({
            data: buffer.readUArray(Number(dataFormatLengthPerPolygon),UnsignedBytes.uchar)
        })
    const triangle: FILE.TRIANGLE[] = []
    for(var i = 0;i < nOfTriangles;i++)
        triangle.push({
            firstPolygonIndex: buffer.readShort(),
            secondPolygonIndex: buffer.readShort(),
            thirdPolygonIndex: buffer.readShort()
        })
    const model_data: FILE.DATA = {
        xPos: buffer.readFloat(),
        yPos: buffer.readFloat(),
        zPos: buffer.readFloat(),
        xRot: buffer.readFloat(),
        yRot: buffer.readFloat(),
        zRot: buffer.readFloat(),
    }
    const _boneName: Pascal64string[] = []
    for(var i = 0;i < nOfBones;i++)
        _boneName.push(readPascal64string(buffer))
    const bone_name: FILE.BONE_NAMES = {
        boneName: _boneName
    }
    const bone_properties: FILE.BONE_PROPERTIES[] = []
    for(var i = 0;i < nOfBones;i++)
        bone_properties.push({
            unknown3: buffer.readArray(16,SignedBytes.float)
        })
    return {
        file_format_revision,
        textureName,
        unknown1,
        dataFormat,
        dataFormatLengthPerPolygon,
        nOfPolygons,
        nOfTriangles,
        nOfBones,
        polygon,
        triangle,
        model_data,
        bone_name,
        bone_properties
    }
}