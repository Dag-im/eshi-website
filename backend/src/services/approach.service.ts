import { ApproachEntity } from '../entities/approach.entity';
import { CustomError } from '../lib/jwt';
import { logger } from '../lib/logger';
import { getRepository } from '../lib/repository';

export async function getApproaches() {
  return getRepository(ApproachEntity).find({ order: { sortOrder: 'ASC', createdAt: 'ASC' } });
}

export async function getApproach(id: string) {
  const item = await getRepository(ApproachEntity).findOne({ where: { id: Number(id) } });
  if (!item) throw new CustomError('Approach not found.', 404);
  return item;
}

export async function createApproach(data: { title: string; description: string; icon?: string | null; sortOrder?: number }, userId: string) {
  const item = await getRepository(ApproachEntity).save({ ...data, icon: data.icon || null, sortOrder: data.sortOrder ?? 0 });
  logger.info({ action: 'approach_created', approachId: item.id, userId });
  return item;
}

export async function updateApproach(id: string, data: { title?: string; description?: string; icon?: string | null; sortOrder?: number }, userId: string) {
  const repo = getRepository(ApproachEntity);
  const item = await repo.findOne({ where: { id: Number(id) } });
  if (!item) throw new CustomError('Approach not found.', 404);
  Object.assign(item, { ...data, icon: data.icon === undefined ? item.icon : data.icon || null });
  const saved = await repo.save(item);
  logger.info({ action: 'approach_updated', approachId: id, userId });
  return saved;
}

export async function deleteApproach(id: string, userId: string) {
  const repo = getRepository(ApproachEntity);
  const item = await repo.findOne({ where: { id: Number(id) } });
  if (!item) throw new CustomError('Approach not found.', 404);
  await repo.remove(item);
  logger.info({ action: 'approach_deleted', approachId: id, userId });
}
