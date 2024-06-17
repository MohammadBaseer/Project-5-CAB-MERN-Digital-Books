import fs from "fs";

export const removeTempFile = (file) => {
  if (file) {
    fs.unlink(file.path, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Temp file deleted");
      }
    });
  }
};
