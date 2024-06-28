import multer from "multer";
import path from "path";

export const multerUpload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let extension = path.extname(file.originalname);
    if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
      
      
      // cb(new Error("File extension not supported"), false);
      // cb(null, false);
      // return;
      return cb(new Error("File extension not supported"), false);
    }
    cb(null, true);
  },
});


export const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message === "File extension not supported") {
    res.status(400).json({ error: err.message });
  } else {
    next(err);
  }
};