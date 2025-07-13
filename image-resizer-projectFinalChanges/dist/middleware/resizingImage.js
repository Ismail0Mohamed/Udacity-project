"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const resizeImage = async (req, res) => {
    try {
        const width = parseInt(req.body.width);
        const height = parseInt(req.body.height);
        if (!req.file || !req.file.path || !req.file.originalname) {
            res.status(400).send("No file uploaded or file data is incomplete.");
            return;
        }
        else if (width < 1 || height < 1) {
            res.status(400).send("Invalid width or height.");
            return;
        }
        const filePath = req.file.path;
        const filename = `${width}x${height}-${req.file.originalname}`;
        const outputPath = path_1.default.join(process.cwd(), "uploads/images", filename);
        // If no dimensions provided, serve original image
        if (!width || !height) { // Rename original file to the new filename
            res.sendFile(filePath);
            return;
        }
        await (0, sharp_1.default)(filePath)
            .resize(width, height, {
            fit: "contain",
            background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
            .toFile(outputPath);
        // After verifying the resized file exists
        if (fs_1.default.existsSync(filePath)) {
            fs_1.default.unlinkSync(filePath); // This deletes the original uploaded file
        }
        // Verify file exists after saving
        if (!fs_1.default.existsSync(outputPath)) {
            throw new Error("Resized file was not saved properly");
        }
        // Redirect to the resized image URL
        res.status(200).json({
            resizedImageUrl: `/images/${filename}?width=${width}&height=${height}`
        });
        // res.redirect(`/images/${filename}?width=${width}&height=${height}`);
    }
    catch (err) {
        console.error("Error resizing image:", err);
        res.status(500).send("Error resizing image.");
    }
};
exports.default = resizeImage;
//# sourceMappingURL=resizingImage.js.map