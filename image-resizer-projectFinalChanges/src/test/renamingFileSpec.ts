import renameImageWithDimensions from '../utils/renamingFile';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

describe('Image File Renaming', () => {
  const testDir = path.join(process.cwd(), 'uploads', 'images');

  // Create test directory and single test file
  beforeAll(async () => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    // Create a valid test image using sharp
    await sharp({
      create: {
        width: 100,
        height: 100,
        channels: 4,
        background: { r: 255, g: 0, b: 0, alpha: 0.5 },
      },
    })
      .jpeg()
      .toFile(path.join(testDir, 'testimage.jpg'));
  });

  it('should rename file correctly', async () => {
    // Setup
    const originalName = 'testimage.jpg';
    const testPath = path.join(testDir, originalName);

    // Act
    const newName = await renameImageWithDimensions(testPath, originalName);

    // Assert - just check if we get back a string containing the original name
    expect(typeof newName).toBe('string');
    expect(newName).toContain(originalName);
  });

  // // Clean up after all tests
  // afterAll(() => {
  //     if (fs.existsSync(testDir)) {
  //         fs.rmSync(testDir, { recursive: true });
  //     }
  // });
});
