import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import config from "../config";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const filename =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    cb(null, filename + fileExt);
  },
});

export const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const sendImageCloudinary = (imageName: string, path: string) => {
  return new Promise((resolve, rejects) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName.trim() },
      (err, result) => {
        if (err) {
          rejects(err);
        }
        //delete a file asynchronously
        resolve(result);
        fs.unlink(path, (err) => {
          if (err) {
            rejects(err);
          } else {
            console.log("file is deleted");
          }
        });
      }
    );
  });
};
