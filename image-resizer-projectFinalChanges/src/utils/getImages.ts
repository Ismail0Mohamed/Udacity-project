import fs from 'fs';
import path from 'path';

export default function getGalleryImages(): Array<{ url: string }> {
  const images = path.resolve(__dirname, '../../uploads/images');
  try {
    const files = fs.readdirSync(images);
    return files.map((file) => ({
      url: `uploads/images/${file}`,
    }));
  } catch (error) {
    console.error('Error reading images directory:', error);
    return [];
  }
}
