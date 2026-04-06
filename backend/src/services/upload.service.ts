// src/services/upload.service.ts
import fs from 'fs/promises';
import path from 'path';
import { config } from '../lib/config';
import { logger } from '../lib/logger';

export function buildUploadUrl(filename: string) {
  return `/uploads/${filename}`;
}

export function getFilenameFromUrl(fileUrl?: string | null) {
  if (!fileUrl || !fileUrl.startsWith('/uploads/')) {
    return null;
  }

  return path.basename(fileUrl);
}

export async function deleteImage(fileUrl?: string | null): Promise<void> {
  const filename = getFilenameFromUrl(fileUrl);
  if (!filename) return;

  try {
    await fs.unlink(path.join(config.UPLOAD_PATH, filename));
    logger.info({ action: 'image_deleted', fileUrl });
  } catch (error: any) {
    if (error?.code !== 'ENOENT') {
      logger.error({ action: 'image_delete_failed', fileUrl, error: error.message });
      throw error;
    }
  }
}
