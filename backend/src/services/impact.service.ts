// src/services/impact.service.ts
import { CustomError } from '../lib/jwt';
import { logger } from '../lib/logger';
import { ImpactModel } from '../models/impact.model';
import * as uploadService from './upload.service';

export async function getImpacts() {
  return ImpactModel.find();
}

export async function getImpact(id: string) {
  const impact = await ImpactModel.findById(id);
  if (!impact) throw new CustomError('Impact not found.', 404);
  return impact;
}

export async function createImpact(
  data: { name: string; desc: string; stat: string },
  file: Express.Multer.File,
  userId: string
) {
  const upload = await uploadService.uploadImage(file);
  const impact = new ImpactModel({ ...data, logo: upload.url, logoPublicId: upload.publicId });
  await impact.save();
  logger.info({ action: 'impact_created', impactId: impact._id, userId });
  return impact;
}

export async function updateImpact(
  id: string,
  data: { name?: string; desc?: string; stat?: string },
  userId: string,
  file?: Express.Multer.File
) {
  const impact = await ImpactModel.findById(id);
  if (!impact) throw new CustomError('Impact not found.', 404);
  if (file) {
    if (impact.logoPublicId) await uploadService.deleteImage(impact.logoPublicId);
    const upload = await uploadService.uploadImage(file);
    impact.logo = upload.url;
    impact.logoPublicId = upload.publicId;
  }
  Object.assign(impact, data);
  await impact.save();
  logger.info({ action: 'impact_updated', impactId: id, userId });
  return impact;
}

export async function deleteImpact(id: string, userId: string) {
  const impact = await ImpactModel.findById(id);
  if (!impact) throw new CustomError('Impact not found.', 404);
  if (impact.logoPublicId) await uploadService.deleteImage(impact.logoPublicId);
  await impact.deleteOne();
  logger.info({ action: 'impact_deleted', impactId: id, userId });
}
