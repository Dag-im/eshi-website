import { AboutEntity } from '../entities/about.entity';
import { logger } from '../lib/logger';
import { getRepository } from '../lib/repository';

export async function getAbout() {
  return getRepository(AboutEntity).find({
    order: { createdAt: 'DESC' },
  });
}

export async function createAbout(data: { title: string; paragraphs: string[] }, userId: string) {
  const repo = getRepository(AboutEntity);
  const about = repo.create({
    title: data.title,
    paragraphs: data.paragraphs,
  });
  const savedAbout = await repo.save(about);
  logger.info({ action: 'about_updated', aboutId: savedAbout.id, userId });
  return savedAbout;
}
