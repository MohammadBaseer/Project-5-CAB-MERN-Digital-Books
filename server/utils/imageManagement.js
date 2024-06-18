import { v2 as cloudinary } from "cloudinary";

export const imageUpload = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, { folder: folder });
    // console.log(result);
    return result.secure_url;
  } catch (error) {
    console.log(error);
  }
};
