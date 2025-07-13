"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getGalleryImages;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getGalleryImages() {
    const images = path_1.default.resolve(__dirname, "../../uploads/images");
    try {
        const files = fs_1.default.readdirSync(images);
        return files.map((file) => ({
            url: `uploads/images/${file}`,
        }));
    }
    catch (error) {
        console.error("Error reading images directory:", error);
        return [];
    }
}
//# sourceMappingURL=getImages.js.map