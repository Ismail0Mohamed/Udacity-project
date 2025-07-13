import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { Request, Response } from 'express';

const dimensionsFromUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);
    const filename = req.params.filename;

    // Fix: Use process.cwd() instead of __dirname
    const inputPath = path.join(process.cwd(), 'uploads', 'images', filename);
    const outputDir = path.join(process.cwd(), 'uploads', 'images');

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Check if original file exists
    if (!fs.existsSync(inputPath)) {
      res.status(404).send('Original image not found');
      return;
    }

    // If no dimensions provided, serve original image
    if (!width || !height || isNaN(width) || isNaN(height)) {
      res.sendFile(inputPath);
      return;
    }

    // Create resized image filename
    const resizedFilename = `${width}x${height}-${filename.split('-').slice(1).join('-')}`;
    const outputPath = path.join(process.cwd(), 'uploads', 'images', resizedFilename);

    // If resized version exists, serve it
    if (fs.existsSync(outputPath)) {
      return res.sendFile(outputPath);
    }

    // Resize image
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toFile(outputPath);

    // Verify resized file was created
    if (!fs.existsSync(outputPath)) {
      throw new Error('Failed to create resized image');
    }

    // Send the resized image
    res.sendFile(outputPath);
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error in dimensionsFromUrl:', err);
      res.status(500).send(`Error processing image: ${err.message}`);
    } else {
      console.error('Unknown error in dimensionsFromUrl:', err);
      res.status(500).send('Error processing image');
    }
  }
};

export default dimensionsFromUrl;
