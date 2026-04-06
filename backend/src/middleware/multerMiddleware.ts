// src/middleware/multerMiddleware.ts
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { config } from '../lib/config';
import { CustomError } from '../lib/jwt';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const ensureUploadDirectory = () => {
  fs.mkdirSync(config.UPLOAD_PATH, { recursive: true });
};

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    ensureUploadDirectory();
    cb(null, config.UPLOAD_PATH);
  },
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname) || '.bin';
    const uniqueName = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${extension}`;
    cb(null, uniqueName);
  },
});

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
