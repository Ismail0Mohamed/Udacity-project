"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dimensionsFromUrl = async (req, res) => {
    try {
        const width = parseInt(req.query.width);
        const height = parseInt(req.query.height);
        const filename = req.params.filename;
        // Fix: Use process.cwd() instead of __dirname
        const inputPath = path_1.default.join(process.cwd(), "uploads", "images", filename);
        const outputDir = path_1.default.join(process.cwd(), "uploads", "images");
        // Ensure output directory exists
        if (!fs_1.default.existsSync(outputDir)) {
            fs_1.default.mkdirSync(outputDir, { recursive: true });
        }
        // Check if original file exists
        if (!fs_1.default.existsSync(inputPath)) {
            res.status(404).send("Original image not found");
            return;
        }
        // If no dimensions provided, serve original image
        if (!width || !height || isNaN(width) || isNaN(height)) {
            res.sendFile(inputPath);
            return;
        }
        // Create resized image filename
        const resizedFilename = `${width}x${height}-${filename.split('-').slice(1).join('-')}`;
        const outputPath = path_1.default.join(process.cwd(), "uploads", "images", resizedFilename);
        // If resized version exists, serve it
        if (fs_1.default.existsSync(outputPath)) {
            return res.sendFile(outputPath);
        }
        // Resize image
        await (0, sharp_1.default)(inputPath)
            .resize(width, height, {
            fit: "contain",
            background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
            .toFile(outputPath);
        // Verify resized file was created
        if (!fs_1.default.existsSync(outputPath)) {
            throw new Error("Failed to create resized image");
        }
        // Send the resized image
        res.sendFile(outputPath);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error in dimensionsFromUrl:", err);
            res.status(500).send(`Error processing image: ${err.message}`);
        }
        else {
            console.error("Unknown error in dimensionsFromUrl:", err);
            res.status(500).send("Error processing image");
        }
    }
};
exports.default = dimensionsFromUrl;
//# sourceMappingURL=dimentionsFromUrl.js.map