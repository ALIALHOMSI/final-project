import multer from "multer";
import path from "path";

// Multer config
export default multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads"); // Specify the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      // Generate a unique name for the file
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(
        file.originalname
      )}`;
      cb(null, uniqueName);
    },
  }),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("Unsupported file type!"), false);
      return;
    }
    cb(null, true);
  },
});
