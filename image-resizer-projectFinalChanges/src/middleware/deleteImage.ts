import path from 'path';
import fs from 'fs';
import { Request, Response } from 'express';

const deleteImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const filename = req.params.filename;

    // Validate filename
    if (!filename || filename.trim() === '') {
      res.status(400).send('Invalid filename');
      return;
    }

    // Fix: Use process.cwd() instead of __dirname
    const inputPath = path.join(process.cwd(), 'uploads', 'images', filename);

    // Check if original file exists
    if (!fs.existsSync(inputPath)) {
      res.status(404).send('Original image not found');
      return;
    }

    // Check if it's actually a file (not a directory)
    const stats = fs.statSync(inputPath);
    if (!stats.isFile()) {
      res.status(400).send('Path is not a file');
      return;
    }

    fs.unlinkSync(inputPath);

    res.sendStatus(203);
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error in deleteImage:', err);
      res.status(500).send(`Error deleting image: ${err.message}`);
    } else {
      console.error('Unknown error in deleteImage:', err);
      res.status(500).send('Error deleting image');
    }
  }
};

export default deleteImage;
