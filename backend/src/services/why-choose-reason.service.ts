import { WhyChooseReasonEntity } from '../entities/why-choose-reason.entity';
import { CustomError } from '../lib/jwt';
import { logger } from '../lib/logger';
import { getRepository } from '../lib/repository';

export async function getWhyChooseReasons() {
  return getRepository(WhyChooseReasonEntity).find({ order: { sortOrder: 'ASC', createdAt: 'ASC' } });
}

export async function getWhyChooseReason(id: string) {
  const item = await getRepository(WhyChooseReasonEntity).findOne({ where: { id: Number(id) } });
  if (!item) throw new CustomError('Why choose reason not found.', 404);
  return item;
}

export async function createWhyChooseReason(data: { title: string; description: string; icon?: string | null; sortOrder?: number }, userId: string) {
  const item = await getRepository(WhyChooseReasonEntity).save({ ...data, icon: data.icon || null, sortOrder: data.sortOrder ?? 0 });
  logger.info({ action: 'why_choose_reason_created', whyChooseReasonId: item.id, userId });
  return item;
}

export async function updateWhyChooseReason(id: string, data: { title?: string; description?: string; icon?: string | null; sortOrder?: number }, userId: string) {
  const repo = getRepository(WhyChooseReasonEntity);
  const item = await repo.findOne({ where: { id: Number(id) } });
  if (!item) throw new CustomError('Why choose reason not found.', 404);
  Object.assign(item, { ...data, icon: data.icon === undefined ? item.icon : data.icon || null });
  const saved = await repo.save(item);
  logger.info({ action: 'why_choose_reason_updated', whyChooseReasonId: id, userId });
  return saved;
}

export async function deleteWhyChooseReason(id: string, userId: string) {
  const repo = getRepository(WhyChooseReasonEntity);
  const item = await repo.findOne({ where: { id: Number(id) } });
  if (!item) throw new CustomError('Why choose reason not found.', 404);
  await repo.remove(item);
  logger.info({ action: 'why_choose_reason_deleted', whyChooseReasonId: id, userId });
}
