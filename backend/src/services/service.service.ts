// src/services/service.service.ts
import { ServiceEntity } from '../entities/service.entity';
import { CustomError } from '../lib/jwt';
import { logger } from '../lib/logger';
import { getRepository } from '../lib/repository';

export async function getServices() {
  return getRepository(ServiceEntity).find({ order: { createdAt: 'DESC' } });
}

export async function getService(id: string) {
  const service = await getRepository(ServiceEntity).findOne({ where: { id: Number(id) } });
  if (!service) throw new CustomError('Service not found.', 404);
  return service;
}

export async function createService(
  data: { title: string; description: string; icon: string },
  userId: string
) {
  const repo = getRepository(ServiceEntity);
  const service = repo.create(data);
  const savedService = await repo.save(service);
  logger.info({ action: 'service_created', serviceId: savedService.id, userId });
  return savedService;
}

export async function updateService(
  id: string,
  data: { title?: string; description?: string; icon?: string },
  userId: string
) {
  const repo = getRepository(ServiceEntity);
  const service = await repo.findOne({ where: { id: Number(id) } });
  if (!service) throw new CustomError('Service not found.', 404);
  Object.assign(service, data);
  const savedService = await repo.save(service);
  logger.info({ action: 'service_updated', serviceId: id, userId });
  return savedService;
}

export async function deleteService(id: string, userId: string) {
  const repo = getRepository(ServiceEntity);
  const service = await repo.findOne({ where: { id: Number(id) } });
  if (!service) throw new CustomError('Service not found.', 404);
  await repo.remove(service);
  logger.info({ action: 'service_deleted', serviceId: id, userId });
}
