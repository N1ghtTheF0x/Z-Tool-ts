"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFILE = void 0;
const common_1 = require("../common");
const pascal64string_1 = require("../pascal64string");
function readFILE(buffer) {
    const file_format_revision = (0, pascal64string_1.readPascal64string)(buffer);
    const textureName = (0, pascal64string_1.readPascal64string)(buffer);
    const unknown1 = buffer.readArray(13, common_1.SignedBytes.float);
    const dataFormat = (0, pascal64string_1.readPascal64string)(buffer);
    const dataFormatLengthPerPolygon = buffer.readUInt64();
    const nOfPolygons = buffer.readUInt64();
    const nOfTriangles = buffer.readUInt64();
    const nOfBones = buffer.readUInt64();
    const polygon = [];
    for (var i = 0; i < nOfPolygons; i++)
        polygon.push({
            data: buffer.readUArray(Number(dataFormatLengthPerPolygon), common_1.UnsignedBytes.uchar)
        });
    const triangle = [];
    for (var i = 0; i < nOfTriangles; i++)
        triangle.push({
            firstPolygonIndex: buffer.readShort(),
            secondPolygonIndex: buffer.readShort(),
            thirdPolygonIndex: buffer.readShort()
        });
    const model_data = {
        xPos: buffer.readFloat(),
        yPos: buffer.readFloat(),
        zPos: buffer.readFloat(),
        xRot: buffer.readFloat(),
        yRot: buffer.readFloat(),
        zRot: buffer.readFloat(),
    };
    const _boneName = [];
    for (var i = 0; i < nOfBones; i++)
        _boneName.push((0, pascal64string_1.readPascal64string)(buffer));
    const bone_name = {
        boneName: _boneName
    };
    const bone_properties = [];
    for (var i = 0; i < nOfBones; i++)
        bone_properties.push({
            unknown3: buffer.readArray(16, common_1.SignedBytes.float)
        });
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
    };
}
exports.readFILE = readFILE;
