import sharp from 'sharp';
import { Request, Response } from 'express';
import dimensionsFromUrl from '../middleware/dimentionsFromUrl';

// Helper to create a dummy image for tests
const createTestImage = (filePath: string) => {
  return sharp({
    create: {
      width: 100,
      height: 100,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .jpeg()
    .toFile(filePath);
};

describe('dimensionsFromUrl middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      query: {},
      params: {},
    };
    res = {
      status: jasmine.createSpy('status').and.returnValue({
        send: jasmine.createSpy('send'),
      }),
      send: jasmine.createSpy('send'),
      sendFile: jasmine.createSpy('sendFile'),
    };
  });

  it('should return 404 if the image does not exist', async () => {
    req.params = { filename: 'non-existent.jpg' };
    await dimensionsFromUrl(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(404);
    expect((res.status as jasmine.Spy).calls.mostRecent().returnValue.send).toHaveBeenCalledWith(
      'Original image not found',
    );
  });
});
