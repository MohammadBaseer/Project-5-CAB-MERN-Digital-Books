import multer from "multer";
import path from "path";

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/UserPhotos", function (error, success) {
      if (error) throw error
    });
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname), function(fileNameError, success) {
      if (fileNameError) throw fileNameError
    }); // Append extension
  },
});


//! test 

// user_rout.use(express.static('public'));

// export const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, '../public/images/UserPhotos'), function (error, success) {
//       if (error) throw error
//     });
//   },
//   filename: function (req, file, cb) {
//     const name =Date.now() + path.extname(file.originalname);
//     cb(null, name,function(fileNameError, success) {
//       if (fileNameError) throw fileNameError
//     })
//   },
// });