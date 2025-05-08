import multer from 'multer';
import path from 'path';
import AppError from './../services/AppError.js';

let options = (folder) => {
    const storage = multer.diskStorage({
      destination(req, file, cb) {
        const uploadPath = path.join(process.cwd(), `uploads/${folder}`);
        cb(null, uploadPath);
      },
      filename(req, file, cb) {
        // preserve original extension
        const ext = path.extname(file.originalname);
        const base = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, base + ext);
      }
    });
  
    function fileFilter(req, file, cb) {
      // allow image/* OR video/*
      if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
        cb(null, true);
      } else {
        cb(new AppError("Only images and videos are allowed", 400), false);
      }
    }
  
    return multer({ storage, fileFilter });
  }

export const UploadFile = (folder, fileName) => options(folder).single(fileName);  

export const UploadFiles = (folder, filesName) =>  options(folder).fields(filesName)  

