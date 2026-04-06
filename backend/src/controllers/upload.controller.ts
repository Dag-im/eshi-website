import fs from 'fs/promises';
import path from 'path';
import { Request, Response } from 'express';
import { config } from '../lib/config';
import { CustomError } from '../lib/jwt';

export async function serveUpload(req: Request, res: Response) {
  const { filename } = req.params;
  const uploadRoot = path.resolve(config.UPLOAD_PATH);

  if (!filename || path.basename(filename) !== filename) {
    throw new CustomError('Invalid filename.', 400);
  }

  const filePath = path.resolve(uploadRoot, filename);
  if (filePath !== path.join(uploadRoot, filename) && !filePath.startsWith(`${uploadRoot}${path.sep}`)) {
    throw new CustomError('Forbidden.', 403);
  }

  try {
    await fs.access(filePath);
    res.sendFile(filePath);
  } catch {
    throw new CustomError('File not found.', 404);
  }
}
