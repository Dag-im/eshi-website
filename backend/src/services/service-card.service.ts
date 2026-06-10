import { ServiceCardEntity } from '../entities/service-card.entity';
import { CustomError } from '../lib/jwt';
import { logger } from '../lib/logger';
import { getRepository } from '../lib/repository';

export async function getServiceCards() {
  return getRepository(ServiceCardEntity).find({ order: { sortOrder: 'ASC', createdAt: 'ASC' } });
}

export async function getServiceCard(id: string) {
  const item = await getRepository(ServiceCardEntity).findOne({ where: { id: Number(id) } });
  if (!item) throw new CustomError('Service card not found.', 404);
  return item;
}

export async function createServiceCard(data: { title: string; points: string[]; sortOrder?: number }, userId: string) {
  const item = await getRepository(ServiceCardEntity).save({ ...data, sortOrder: data.sortOrder ?? 0 });
  logger.info({ action: 'service_card_created', serviceCardId: item.id, userId });
  return item;
}

export async function updateServiceCard(id: string, data: { title?: string; points?: string[]; sortOrder?: number }, userId: string) {
  const repo = getRepository(ServiceCardEntity);
  const item = await repo.findOne({ where: { id: Number(id) } });
  if (!item) throw new CustomError('Service card not found.', 404);
  Object.assign(item, data);
  const saved = await repo.save(item);
  logger.info({ action: 'service_card_updated', serviceCardId: id, userId });
  return saved;
}

export async function deleteServiceCard(id: string, userId: string) {
  const repo = getRepository(ServiceCardEntity);
  const item = await repo.findOne({ where: { id: Number(id) } });
  if (!item) throw new CustomError('Service card not found.', 404);
  await repo.remove(item);
  logger.info({ action: 'service_card_deleted', serviceCardId: id, userId });
}
