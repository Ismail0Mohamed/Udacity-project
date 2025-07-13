"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const renamingFile_1 = __importDefault(require("../utils/renamingFile"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
describe("Image File Renaming", () => {
    const testDir = path_1.default.join(process.cwd(), "uploads", "images");
    // Create test directory and single test file
    beforeAll(async () => {
        if (!fs_1.default.existsSync(testDir)) {
            fs_1.default.mkdirSync(testDir, { recursive: true });
        }
        // Create a valid test image using sharp
        await (0, sharp_1.default)({
            create: {
                width: 100,
                height: 100,
                channels: 4,
                background: { r: 255, g: 0, b: 0, alpha: 0.5 },
            },
        })
            .jpeg()
            .toFile(path_1.default.join(testDir, "testimage.jpg"));
    });
    it("should rename file correctly", async () => {
        // Setup
        const originalName = "testimage.jpg";
        const testPath = path_1.default.join(testDir, originalName);
        // Act
        const newName = await (0, renamingFile_1.default)(testPath, originalName);
        // Assert - just check if we get back a string containing the original name
        expect(typeof newName).toBe("string");
        expect(newName).toContain(originalName);
    });
    // // Clean up after all tests
    // afterAll(() => {
    //     if (fs.existsSync(testDir)) {
    //         fs.rmSync(testDir, { recursive: true });
    //     }
    // });
});
//# sourceMappingURL=renamingFileSpec.js.map