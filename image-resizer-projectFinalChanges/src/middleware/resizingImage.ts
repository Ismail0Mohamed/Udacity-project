import sharp from 'sharp';
import path from 'path';
import { Request, Response } from 'express';
import fs from 'fs';

const resizeImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const width = parseInt(req.body.width);
    const height = parseInt(req.body.height);
    if (!req.file || !req.file.path || !req.file.originalname) {
      res.status(400).send('No file uploaded or file data is incomplete.');
      return;
    } else if (width < 1 || height < 1) {
      res.status(400).send('Invalid width or height.');
      return;
    }

    const filePath = req.file.path;
    const filename = `${width}x${height}-${req.file.originalname}`;
    const outputPath = path.join(process.cwd(), 'uploads/images', filename);
    // If no dimensions provided, serve original image
    if (!width || !height) {
      // Rename original file to the new filename
      res.sendFile(filePath);
      return;
    }
    await sharp(filePath)
      .resize(width, height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toFile(outputPath);

    // After verifying the resized file exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // This deletes the original uploaded file
    }

    // Verify file exists after saving
    if (!fs.existsSync(outputPath)) {
      throw new Error('Resized file was not saved properly');
    }

    // Redirect to the resized image URL
    res.status(200).json({
      resizedImageUrl: `/images/${filename}?width=${width}&height=${height}`,
    });
    // res.redirect(`/images/${filename}?width=${width}&height=${height}`);
  } catch (err) {
    console.error('Error resizing image:', err);
    res.status(500).send('Error resizing image.');
  }
};

export default resizeImage;
