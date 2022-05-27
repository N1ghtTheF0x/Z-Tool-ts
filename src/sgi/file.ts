import { float, Reader, uint64 } from "../common";
import { Pascal64string, readPascal64string } from "../pascal64string";

export interface FILE
{
    file_format_revision: Pascal64string
    nOfElements: uint64
    element: FILE.ELEMENT[]
}

export namespace FILE
{
    export interface ELEMENT
    {
        elementName: Pascal64string
        shapeName: Pascal64string
        unknown: float[] // 16
        unknown2: string // 2
        nOfAnimations: uint64
        animation: ELEMENT.ANIMATION[]
    }

    export namespace ELEMENT
    {
        export interface ANIMATION
        {
            animationName: Pascal64string
            animationFileName: Pascal64string
        }
    }
    export function readELEMENT(buffer: Reader): ELEMENT
    {
        const elementName = readPascal64string(buffer)
        const shapeName = readPascal64string(buffer)
        const unknown = []
        for(var i = 0;i < 16;i++)
            unknown.push(buffer.readFloat())
        const unknown2 = buffer.readString(2)
        const nOfAnimations = buffer.readUInt64()
        const animation: ELEMENT.ANIMATION[] = []
        for(var i = 0;i <nOfAnimations;i++)
            animation.push({
                animationName: readPascal64string(buffer),
                animationFileName: readPascal64string(buffer)
            })

        return {
            elementName,
            shapeName,
            unknown,
            unknown2,
            nOfAnimations,
            animation
        }
    }
}

export function readFILE(buffer: Reader): FILE
{
    const file_format_revision = readPascal64string(buffer)
    const nOfElements = buffer.readUInt64()
    const element: FILE.ELEMENT[] = []
    for(var i = 0;i < nOfElements;i++)
        element.push(FILE.readELEMENT(buffer))

    return {
        file_format_revision,
        nOfElements,
        element
    }
}