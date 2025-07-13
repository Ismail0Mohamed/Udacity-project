"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const deleteImage = async (req, res) => {
    try {
        const filename = req.params.filename;
        // Validate filename
        if (!filename || filename.trim() === '') {
            res.status(400).send("Invalid filename");
            return;
        }
        // Fix: Use process.cwd() instead of __dirname
        const inputPath = path_1.default.join(process.cwd(), "uploads", "images", filename);
        // Check if original file exists
        if (!fs_1.default.existsSync(inputPath)) {
            res.status(404).send("Original image not found");
            return;
        }
        // Check if it's actually a file (not a directory)
        const stats = fs_1.default.statSync(inputPath);
        if (!stats.isFile()) {
            res.status(400).send("Path is not a file");
            return;
        }
        fs_1.default.unlinkSync(inputPath);
        res.sendStatus(203);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error in deleteImage:", err);
            res.status(500).send(`Error deleting image: ${err.message}`);
        }
        else {
            console.error("Unknown error in deleteImage:", err);
            res.status(500).send("Error deleting image");
        }
    }
};
exports.default = deleteImage;
//# sourceMappingURL=deleteImage.js.map