import { MethodologyPhaseEntity } from '../entities/methodology-phase.entity';
import { CustomError } from '../lib/jwt';
import { logger } from '../lib/logger';
import { getRepository } from '../lib/repository';

export async function getMethodologyPhases() {
  return getRepository(MethodologyPhaseEntity).find({ order: { sortOrder: 'ASC', createdAt: 'ASC' } });
}

export async function getMethodologyPhase(id: string) {
  const item = await getRepository(MethodologyPhaseEntity).findOne({ where: { id: Number(id) } });
  if (!item) throw new CustomError('Methodology phase not found.', 404);
  return item;
}

export async function createMethodologyPhase(data: { phase: string; description: string; items?: string[]; sortOrder?: number }, userId: string) {
  const item = await getRepository(MethodologyPhaseEntity).save({ ...data, items: data.items || [], sortOrder: data.sortOrder ?? 0 });
  logger.info({ action: 'methodology_phase_created', methodologyPhaseId: item.id, userId });
  return item;
}

export async function updateMethodologyPhase(id: string, data: { phase?: string; description?: string; items?: string[]; sortOrder?: number }, userId: string) {
  const repo = getRepository(MethodologyPhaseEntity);
  const item = await repo.findOne({ where: { id: Number(id) } });
  if (!item) throw new CustomError('Methodology phase not found.', 404);
  Object.assign(item, data);
  const saved = await repo.save(item);
  logger.info({ action: 'methodology_phase_updated', methodologyPhaseId: id, userId });
  return saved;
}

export async function deleteMethodologyPhase(id: string, userId: string) {
  const repo = getRepository(MethodologyPhaseEntity);
  const item = await repo.findOne({ where: { id: Number(id) } });
  if (!item) throw new CustomError('Methodology phase not found.', 404);
  await repo.remove(item);
  logger.info({ action: 'methodology_phase_deleted', methodologyPhaseId: id, userId });
}
