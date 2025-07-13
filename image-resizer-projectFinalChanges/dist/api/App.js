"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const upload_1 = __importDefault(require("../middleware/upload"));
const resizingImage_1 = __importDefault(require("../middleware/resizingImage"));
const dimentionsFromUrl_1 = __importDefault(require("../middleware/dimentionsFromUrl"));
const fs_1 = __importDefault(require("fs"));
const deleteImage_1 = __importDefault(require("../middleware/deleteImage"));
const app = (0, express_1.default)();
const uploadsPath = path_1.default.join(process.cwd(), "uploads", "images");
// Create uploads directory if it doesn't exist
if (!fs_1.default.existsSync(uploadsPath)) {
    fs_1.default.mkdirSync(uploadsPath, { recursive: true });
}
// Add middleware to parse JSON
app.use(express_1.default.json());
// Static file serving
app.use("/uploads/images", express_1.default.static(uploadsPath));
app.use(express_1.default.static(path_1.default.resolve(__dirname, "../../src/frontend")));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "../../src/frontend/index.html"));
});
// Handle dynamic image requests before static serving
app.get("/images/:filename", dimentionsFromUrl_1.default);
// Update your gallery endpoint to include more logging
app.get("/api/images", (req, res) => {
    try {
        const files = fs_1.default.readdirSync(uploadsPath);
        const imagePaths = files
            .filter((file) => file.toLowerCase().endsWith(".jpg") || file.toLowerCase().endsWith(".png"))
            .map((file) => `/uploads/images/${file}`);
        res.json(imagePaths);
    }
    catch (error) {
        console.error("Error reading images directory:", error);
        res.status(500).json({ error: "Unable to read images directory" });
    }
});
// Upload route with proper typing
app.post("/upload", upload_1.default.single("file"), ((req, res, next) => {
    if (!(req).file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    const file = (req).file;
    if (!file.mimetype.startsWith("image/jpeg") && !file.mimetype.startsWith("image/png")) {
        fs_1.default.unlinkSync(file.path);
        return res.status(400).json({ error: "Only .jpg and .png images are allowed" });
    }
    next();
}), resizingImage_1.default);
// Delete image handler
app.delete("/images/:filename", deleteImage_1.default);
app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000/");
});
exports.default = app;
//# sourceMappingURL=App.js.map