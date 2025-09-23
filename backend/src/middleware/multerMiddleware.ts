// src/middleware/multerMiddleware.ts
import multer from 'multer';
import { CustomError } from '../lib/jwt';

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const storage = multer.memoryStorage();

import type { Request } from 'express';

const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(new CustomError('Invalid file type. Only JPEG, PNG, and WebP are allowed.', 400));
  }
  cb(null, true);
};

export const singleUpload = (req: Request, res: any, next: any) => {
  multer({
    storage,
    fileFilter,
    limits: {
      fileSize: MAX_FILE_SIZE,
    },
  }).single('image')(req, res, (err: any) => {
    if (err) {
      return next(err);
    }
    next();
  });
};

export const multipleUpload = (req: Request, res: any, next: any) => {
  multer({
    storage,
    fileFilter,
    limits: {
      fileSize: MAX_FILE_SIZE,
      files: 10, // Max 10 files per request
    },
  }).array('images')(req, res, (err: any) => {
    if (err) {
      return next(err);
    }
    next();
  });
};
