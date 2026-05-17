import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET, secure: true });

export async function uploadImage(dataUri: string, folder = "bloom-studio") {
  return cloudinary.uploader.upload(dataUri, { folder, resource_type: "image" });
}
