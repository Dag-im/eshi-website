// src/services/upload.service.ts
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { config } from '../lib/config';
import { CustomError } from '../lib/jwt';
import { logger } from '../lib/logger';

// Validate config
if (!config.CLOUDINARY_CLOUD_NAME || !config.CLOUDINARY_API_KEY || !config.CLOUDINARY_API_SECRET) {
  throw new Error('Cloudinary configuration missing');
}

// Setup Cloudinary
cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface UploadResult {
  url: string;
  publicId: string;
}

/**
 * Upload a single image to Cloudinary.
 */
export async function uploadImage(file: Express.Multer.File): Promise<UploadResult> {
  try {
    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'eshi-app',
          format: 'jpg',
          transformation: [
            { width: 1920, height: 1080, crop: 'limit', quality: 'auto' },
            { fetch_format: 'auto' },
          ],
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error || !result) {
            return reject(new CustomError('Image upload failed', 500));
          }
          resolve(result);
        }
      );

      uploadStream.end(file.buffer);
    });

    if (!result.secure_url || !result.public_id) {
      throw new CustomError('Invalid upload response', 500);
    }

    logger.info({ action: 'image_uploaded', publicId: result.public_id });
    return { url: result.secure_url, publicId: result.public_id };
  } catch (error: any) {
    logger.error({ action: 'image_upload_failed', error: error.message });
    throw new CustomError('Failed to upload image', 500);
  }
}

/**
 * Delete an image from Cloudinary by publicId.
 */
export async function deleteImage(publicId: string): Promise<void> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== 'ok') {
      throw new CustomError('Failed to delete image', 500);
    }

    logger.info({ action: 'image_deleted', publicId });
  } catch (error: any) {
    logger.error({ action: 'image_delete_failed', publicId, error: error.message });
    throw new CustomError('Failed to delete image', 500);
  }
}
