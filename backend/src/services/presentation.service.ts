// src/services/presentation.service.ts
import { CustomError } from '../lib/jwt';
import { logger } from '../lib/logger';
import { PresentationModel } from '../models/presentation.model';

export async function getPresentations() {
  return PresentationModel.find();
}

export async function getPresentation(id: string) {
  const presentation = await PresentationModel.findById(id);
  if (!presentation) throw new CustomError('Presentation not found.', 404);
  return presentation;
}

export async function createPresentation(
  data: { title: string; description: string },
  userId: string
) {
  const presentation = new PresentationModel(data);
  await presentation.save();
  logger.info({ action: 'presentation_created', presentationId: presentation._id, userId });
  return presentation;
}

export async function updatePresentation(
  id: string,
  data: { title?: string; description?: string },
  userId: string
) {
  const presentation = await PresentationModel.findByIdAndUpdate(id, data, { new: true });
  if (!presentation) throw new CustomError('Presentation not found.', 404);
  logger.info({ action: 'presentation_updated', presentationId: id, userId });
  return presentation;
}

export async function deletePresentation(id: string, userId: string) {
  const presentation = await PresentationModel.findByIdAndDelete(id);
  if (!presentation) throw new CustomError('Presentation not found.', 404);
  logger.info({ action: 'presentation_deleted', presentationId: id, userId });
}
