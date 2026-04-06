// src/services/impact.service.ts
import { ImpactEntity } from '../entities/impact.entity';
import { CustomError } from '../lib/jwt';
import { logger } from '../lib/logger';
import { getRepository } from '../lib/repository';
import * as uploadService from './upload.service';

export async function getImpacts() {
  return getRepository(ImpactEntity).find({ order: { createdAt: 'DESC' } });
}

export async function getImpact(id: string) {
  const impact = await getRepository(ImpactEntity).findOne({ where: { id: Number(id) } });
  if (!impact) throw new CustomError('Impact not found.', 404);
  return impact;
}

export async function createImpact(
  data: { name: string; desc: string; stat: string },
  file: Express.Multer.File,
  userId: string
) {
  const repo = getRepository(ImpactEntity);
  const impact = repo.create({
    ...data,
    logo: uploadService.buildUploadUrl(file.filename),
  });
  const savedImpact = await repo.save(impact);
  logger.info({ action: 'impact_created', impactId: savedImpact.id, userId });
  return savedImpact;
}

export async function updateImpact(
  id: string,
  data: { name?: string; desc?: string; stat?: string },
  userId: string,
  file?: Express.Multer.File
) {
  const repo = getRepository(ImpactEntity);
  const impact = await repo.findOne({ where: { id: Number(id) } });
  if (!impact) throw new CustomError('Impact not found.', 404);
  if (file) {
    await uploadService.deleteImage(impact.logo);
    impact.logo = uploadService.buildUploadUrl(file.filename);
  }
  Object.assign(impact, data);
  const savedImpact = await repo.save(impact);
  logger.info({ action: 'impact_updated', impactId: id, userId });
  return savedImpact;
}

export async function deleteImpact(id: string, userId: string) {
  const repo = getRepository(ImpactEntity);
  const impact = await repo.findOne({ where: { id: Number(id) } });
  if (!impact) throw new CustomError('Impact not found.', 404);
  await uploadService.deleteImage(impact.logo);
  await repo.remove(impact);
  logger.info({ action: 'impact_deleted', impactId: id, userId });
}
