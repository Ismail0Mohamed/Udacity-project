import supertest from 'supertest';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import app from '../api/App';

describe('Test endpoint responses', () => {
  const fixturesDir = path.join(__dirname, 'fixtures');
  console.log('Fixtures directory:', fixturesDir);
  const testImagePath = path.join(fixturesDir, 'test-image.png');

  beforeAll(async () => {
    // Create fixtures directory if it doesn't exist
    if (!fs.existsSync(fixturesDir)) {
      fs.mkdirSync(fixturesDir, { recursive: true });
    }

    // Create test image using sharp
    await sharp({
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

  it('post the upload endpoint', async () => {
    const response = await supertest(app)
      .post('/upload')
      .attach('file', testImagePath)
      .field('width', '300')
      .field('height', '200');

    expect(response.status).toBe(200); // Expect redirect status after successful upload
  });

  it('gets the images endpoint', async () => {
    const response = await supertest(app).get('/');
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
