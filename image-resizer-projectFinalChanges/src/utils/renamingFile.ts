import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function renameImageWithDimensions(filePath: string, originalName: string): Promise<string> {
  const metadata = await sharp(filePath).metadata();
  const width = metadata.width;
  const height = metadata.height;
  const newFilename = `${width}x${height}-${originalName}`;
  const newPath = path.join(path.dirname(filePath), newFilename);
  fs.renameSync(filePath, newPath);
  return newFilename;
}
export default renameImageWithDimensions;
