import { HeroContentEntity } from '../entities/hero-content.entity';
import { CustomError } from '../lib/jwt';
import { logger } from '../lib/logger';
import { getRepository } from '../lib/repository';

export async function getHeroContents() {
  return getRepository(HeroContentEntity).find({
    order: { createdAt: 'DESC' },
  });
}

export async function getHeroContent(id: string) {
  const heroContent = await getRepository(HeroContentEntity).findOne({ where: { id: Number(id) } });
  if (!heroContent) throw new CustomError('Hero content not found.', 404);
  return heroContent;
}

export async function createHeroContent(
  data: { title: string; subtitle: string; description: string },
  userId: string
) {
  const repo = getRepository(HeroContentEntity);
  const heroContent = repo.create(data);
  const savedHeroContent = await repo.save(heroContent);
  logger.info({ action: 'hero_content_created', heroContentId: savedHeroContent.id, userId });
  return savedHeroContent;
}

export async function updateHeroContent(
  id: string,
  data: { title?: string; subtitle?: string; description?: string },
  userId: string
) {
  const repo = getRepository(HeroContentEntity);
  const heroContent = await repo.findOne({ where: { id: Number(id) } });
  if (!heroContent) throw new CustomError('Hero content not found.', 404);
  Object.assign(heroContent, data);
  const savedHeroContent = await repo.save(heroContent);
  logger.info({ action: 'hero_content_updated', heroContentId: id, userId });
  return savedHeroContent;
}

export async function deleteHeroContent(id: string, userId: string) {
  const repo = getRepository(HeroContentEntity);
  const heroContent = await repo.findOne({ where: { id: Number(id) } });
  if (!heroContent) throw new CustomError('Hero content not found.', 404);
  await repo.remove(heroContent);
  logger.info({ action: 'hero_content_deleted', heroContentId: id, userId });
}
