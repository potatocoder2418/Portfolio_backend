import multer from "multer";
import cloudinary from "../config/cloudinary.config.js";

export const uploadToCloudinary = async (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "my-projects",
          allowed_formats: ["jpg", "jpeg", "png", "webp"],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      )
      .end(buffer); // Upload the buffer directly
  });
};

const storage = multer.memoryStorage();

export const uploadProjectFiles = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
}).fields([
  { name: "pic", maxCount: 1 },
  { name: "screenshots", maxCount: 10 },
]);
