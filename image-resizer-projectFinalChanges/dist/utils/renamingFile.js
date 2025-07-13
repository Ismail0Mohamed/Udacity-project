"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function renameImageWithDimensions(filePath, originalName) {
    const metadata = await (0, sharp_1.default)(filePath).metadata();
    const width = metadata.width;
    const height = metadata.height;
    const newFilename = `${width}x${height}-${originalName}`;
    const newPath = path_1.default.join(path_1.default.dirname(filePath), newFilename);
    fs_1.default.renameSync(filePath, newPath);
    return newFilename;
}
exports.default = renameImageWithDimensions;
//# sourceMappingURL=renamingFile.js.map