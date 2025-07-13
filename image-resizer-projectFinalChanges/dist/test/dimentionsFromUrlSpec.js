"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const dimentionsFromUrl_1 = __importDefault(require("../middleware/dimentionsFromUrl"));
// Helper to create a dummy image for tests
const createTestImage = (filePath) => {
    return (0, sharp_1.default)({
        create: {
            width: 100,
            height: 100,
            channels: 3,
            background: { r: 255, g: 255, b: 255 }
        }
    }).jpeg().toFile(filePath);
};
describe("dimensionsFromUrl middleware", () => {
    let req;
    let res;
    beforeEach(() => {
        req = {
            query: {},
            params: {},
        };
        res = {
            status: jasmine.createSpy('status').and.returnValue({
                send: jasmine.createSpy('send')
            }),
            send: jasmine.createSpy('send'),
            sendFile: jasmine.createSpy('sendFile'),
        };
    });
    it("should return 404 if the image does not exist", async () => {
        req.params = { filename: "non-existent.jpg" };
        await (0, dimentionsFromUrl_1.default)(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.status.calls.mostRecent().returnValue.send).toHaveBeenCalledWith("Original image not found");
    });
});
//# sourceMappingURL=dimentionsFromUrlSpec.js.map