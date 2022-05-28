"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const gbs_1 = require("./gbs");
const gfs_1 = require("./gfs");
const sga_1 = require("./sga");
const sgi_1 = require("./sgi");
const sgm_1 = require("./sgm");
const sgs_1 = require("./sgs");
const unpackTypes = [
    "gbs",
    "gfs",
    "sga",
    "sgi",
    "sgm",
    "sgs"
];
if (process.argv.length == 2 || (process.argv.includes("-h") || process.argv.includes("--help"))) {
    console.info(`Z-Tool by N1ghtTheF0x\n\nUsage: z-tool-<os> <gbs|gfs|sga|sgi|sgm|sgs> <path> [<output>]\nExample: z-tool-win gfs levels.gfs levels_extracted`);
    process.exit(0);
}
const file = process.argv[3];
const unpackType = process.argv[2] ?? "gfs";
const outputFolder = process.argv[4] ?? "output";
if (unpackTypes.includes(unpackType)) {
    const oFolder = (0, path_1.resolve)(process.cwd(), outputFolder);
    const fpath = (0, path_1.resolve)(process.cwd(), file);
    const filename = (0, path_1.basename)(file, (0, path_1.extname)(file));
    var obj;
    switch (unpackType) {
        case "gfs":
            {
                obj = new gfs_1.GFS(fpath);
                break;
            }
        case "gbs":
            {
                obj = new gbs_1.GBS(fpath);
                break;
            }
        case "sga":
            {
                obj = new sga_1.SGA(fpath);
                break;
            }
        case "sgi":
            {
                obj = new sgi_1.SGI(fpath);
                break;
            }
        case "sgm":
            {
                obj = new sgm_1.SGM(fpath);
                break;
            }
        case "sgs":
            {
                obj = new sgs_1.SGS(fpath);
                break;
            }
        default:
            obj = {};
            break;
    }
    //writeFileSync(resolve(process.cwd(),`${filename}.json`),object2string(obj),"utf-8")
    if (obj.constructor.name == "GFS") {
        const gfs = obj;
        const data = gfs.readData();
        for (const filedata of data.data) {
            const filepath = (0, path_1.resolve)(oFolder, filedata.fileinfo.reference_path);
            const dirpath = (0, path_1.dirname)(filepath);
            if (!(0, fs_1.existsSync)(dirpath))
                (0, fs_1.mkdirSync)(dirpath, { recursive: true });
            (0, fs_1.writeFileSync)(filepath, filedata.fdata);
        }
    }
    process.exit(0);
}
