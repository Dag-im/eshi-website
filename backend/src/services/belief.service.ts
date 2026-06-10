import { BeliefEntity } from '../entities/belief.entity';
import { CustomError } from '../lib/jwt';
import { logger } from '../lib/logger';
import { getRepository } from '../lib/repository';

export async function getBeliefs() {
  return getRepository(BeliefEntity).find({
    order: { createdAt: 'DESC' },
  });
}

export async function getBelief(id: string) {
  const belief = await getRepository(BeliefEntity).findOne({ where: { id: Number(id) } });
  if (!belief) throw new CustomError('Belief not found.', 404);
  return belief;
}

export async function createBelief(data: { title: string; description: string }, userId: string) {
  const repo = getRepository(BeliefEntity);
  const belief = repo.create(data);
  const savedBelief = await repo.save(belief);
  logger.info({ action: 'belief_created', beliefId: savedBelief.id, userId });
  return savedBelief;
}

export async function updateBelief(
  id: string,
  data: { title?: string; description?: string },
  userId: string
) {
  const repo = getRepository(BeliefEntity);
  const belief = await repo.findOne({ where: { id: Number(id) } });
  if (!belief) throw new CustomError('Belief not found.', 404);
  Object.assign(belief, data);
  const savedBelief = await repo.save(belief);
  logger.info({ action: 'belief_updated', beliefId: id, userId });
  return savedBelief;
}

export async function deleteBelief(id: string, userId: string) {
  const repo = getRepository(BeliefEntity);
  const belief = await repo.findOne({ where: { id: Number(id) } });
  if (!belief) throw new CustomError('Belief not found.', 404);
  await repo.remove(belief);
  logger.info({ action: 'belief_deleted', beliefId: id, userId });
}
