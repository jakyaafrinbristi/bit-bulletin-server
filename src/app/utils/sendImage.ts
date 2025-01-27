

import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs';
cloudinary.config({ 
        
  cloud_name: config.cloud_name, 
  api_key: config.cloudinary_api_key, 
  api_secret: config.cloudinary_api_secret

}); 


export const sendImage = (imageName: string, path: string): Promise<Record<string,unknown>> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(path, { public_id: imageName })
      .then((uploadResult) => {
        console.log('Upload Successful:', uploadResult);
        resolve(uploadResult);
        fs.unlink(path, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('File is deleted.');
          }
        }); // Resolve the promise with the upload result
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        reject(error); // Reject the promise with the error
      });
  });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.cwd()+'/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
 export const upload = multer({ storage: storage })