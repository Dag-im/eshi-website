// src/services/service.service.ts
import { CustomError } from '../lib/jwt';
import { logger } from '../lib/logger';
import { ServiceModel } from '../models/service.model';

export async function getServices() {
  return ServiceModel.find();
}

export async function getService(id: string) {
  const service = await ServiceModel.findById(id);
  if (!service) throw new CustomError('Service not found.', 404);
  return service;
}

export async function createService(
  data: { title: string; description: string; icon: string },
  userId: string
) {
  const service = new ServiceModel(data);
  await service.save();
  logger.info({ action: 'service_created', serviceId: service._id, userId });
  return service;
}

export async function updateService(
  id: string,
  data: { title?: string; description?: string; icon?: string },
  userId: string
) {
  const service = await ServiceModel.findByIdAndUpdate(id, data, { new: true });
  if (!service) throw new CustomError('Service not found.', 404);
  logger.info({ action: 'service_updated', serviceId: id, userId });
  return service;
}

export async function deleteService(id: string, userId: string) {
  const service = await ServiceModel.findByIdAndDelete(id);
  if (!service) throw new CustomError('Service not found.', 404);
  logger.info({ action: 'service_deleted', serviceId: id, userId });
}
