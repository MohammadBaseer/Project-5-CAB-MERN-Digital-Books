import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

export const cloudinaryConfig = () => {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET, // Click 'View Credentials' below to copy your API secret
  });
};
