import { v2 as cloudinary } from "cloudinary";

const imageUpload = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, { folder: folder });
    // console.log(result);
    return result.secure_url;
  } catch (error) {
    console.log(error);
  }
};

//! Remove the image from cloudinary

const removeImage = async (cloudinaryImageFolder, imageUrl) => {
  const getImageUrl = imageUrl;
  const urlArray = getImageUrl.split("/");
  const image = urlArray[urlArray.length - 1];
  const cleanImageName = image.split(".")[0];
  const imageFolder = cloudinaryImageFolder;

  const imageName = `${imageFolder}/${cleanImageName}`;

  try {
    const result = await cloudinary.uploader.destroy(imageName);
    if (result.result === "ok") {
      console.log("Image deleted successfully:", result);
    } else {
      console.error("Error deleting image:", result);
    }
  } catch (error) {
    console.error("Something went wrong", error);
  }
};

export { imageUpload, removeImage };
