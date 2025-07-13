"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const App_1 = __importDefault(require("../api/App"));
describe("Test endpoint responses", () => {
    const fixturesDir = path_1.default.join(__dirname, "fixtures");
    console.log("Fixtures directory:", fixturesDir);
    const testImagePath = path_1.default.join(fixturesDir, "test-image.png");
    beforeAll(async () => {
        // Create fixtures directory if it doesn't exist
        if (!fs_1.default.existsSync(fixturesDir)) {
            fs_1.default.mkdirSync(fixturesDir, { recursive: true });
        }
        // Create test image using sharp
        await (0, sharp_1.default)({
            create: {
                width: 100,
                height: 100,
                channels: 4,
                background: { r: 255, g: 0, b: 0, alpha: 0.5 },
            },
        })
            .png()
            .toFile(testImagePath);
    });
    it("post the upload endpoint", async () => {
        const response = await (0, supertest_1.default)(App_1.default)
            .post("/upload")
            .attach("file", testImagePath)
            .field("width", "300")
            .field("height", "200");
        expect(response.status).toBe(200); // Expect redirect status after successful upload
    });
    it("gets the images endpoint", async () => {
        const response = await (0, supertest_1.default)(App_1.default).get("/");
        expect(response.status).toBe(200);
    });
    // afterAll(() => {
    //   // Clean up test image
    //   if (fs.existsSync(testImagePath)) {
    //     fs.unlinkSync(testImagePath);
    //   }
    //   if (fs.existsSync(fixturesDir)) {
    //     fs.rmdirSync(fixturesDir);
    //   }
    // });
});
//# sourceMappingURL=AppSpec.js.map