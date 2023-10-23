import multer, { diskStorage } from "multer";
import { join, extname } from "path";
const maxFileSize = 10000000;

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(process.cwd(), "/public/image"));
  },
  filename: (req, file, cb) => {
    let name = Math.random() * 1 + Date.now() + extname(file.originalname);
    cb(null, name);
  },
  limits: {
    fileSize: maxFileSize,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const upload = multer({ storage });

export default upload;
