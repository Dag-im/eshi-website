// src/services/presentation.service.ts
import { PresentationEntity } from '../entities/presentation.entity';
import { CustomError } from '../lib/jwt';
import { logger } from '../lib/logger';
import { getRepository } from '../lib/repository';
import { buildUploadUrl, deleteImage } from './upload.service';

export async function getPresentations() {
  return getRepository(PresentationEntity).find({
    order: { createdAt: 'DESC' },
  });
}

export async function getPresentation(id: string) {
  const presentation = await getRepository(PresentationEntity).findOne({
    where: { id: Number(id) },
  });
  if (!presentation) throw new CustomError('Presentation not found.', 404);
  return presentation;
}

export async function createPresentation(
  data: { title: string; description: string },
  userId: string,
  file?: Express.Multer.File
) {
  const repo = getRepository(PresentationEntity);
  const presentation = repo.create({
    ...data,
    imageUrl: file?.filename ? buildUploadUrl(file.filename) : null,
  });
  const savedPresentation = await repo.save(presentation);
  logger.info({ action: 'presentation_created', presentationId: savedPresentation.id, userId });
  return savedPresentation;
}

export async function updatePresentation(
  id: string,
  data: { title?: string; description?: string; imageUrl?: string | null },
  userId: string,
  file?: Express.Multer.File
) {
  const repo = getRepository(PresentationEntity);
  const presentation = await repo.findOne({ where: { id: Number(id) } });
  if (!presentation) throw new CustomError('Presentation not found.', 404);

  if (file?.filename) {
    await deleteImage(presentation.imageUrl);
    data.imageUrl = buildUploadUrl(file.filename);
  }

  Object.assign(presentation, data);
  const savedPresentation = await repo.save(presentation);
  logger.info({ action: 'presentation_updated', presentationId: id, userId });
  return savedPresentation;
}

export async function deletePresentation(id: string, userId: string) {
  const repo = getRepository(PresentationEntity);
  const presentation = await repo.findOne({ where: { id: Number(id) } });
  if (!presentation) throw new CustomError('Presentation not found.', 404);
  await deleteImage(presentation.imageUrl);
  await repo.remove(presentation);
  logger.info({ action: 'presentation_deleted', presentationId: id, userId });
}
