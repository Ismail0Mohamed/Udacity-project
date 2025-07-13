import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb): void => {
    cb(null, path.join(__dirname, '../../uploads/images'));
  },
  filename: (req, file, cb): void => {
    cb(null, file.size + '-' + file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
