// src/services/hero.service.ts
import { HeroEntity, HeroImage } from '../entities/hero.entity';
import { logger } from '../lib/logger';
import { getRepository } from '../lib/repository';
import * as uploadService from './upload.service';

export async function getHero() {
  const repo = getRepository(HeroEntity);
  let hero = await repo.findOne({ where: {} });
  if (!hero) {
    hero = repo.create({ bgImages: [] });
    hero = await repo.save(hero);
  }
  return hero;
}

export async function updateHero(
  bgImages: { src?: string; alt: string; file?: Express.Multer.File }[],
  userId: string
) {
  // MIGRATION: replaced mongoose with TypeORM here.
  const repo = getRepository(HeroEntity);
  const hero = await getHero();

  const newBgImages: HeroImage[] = [];
  for (const img of bgImages) {
    let src = img.src;
    if (img.file) {
      src = uploadService.buildUploadUrl(img.file.filename);
    }
    if (src) newBgImages.push({ src, alt: img.alt });
  }

  for (const oldImg of hero.bgImages) {
    if (!newBgImages.some((newImg) => newImg.src === oldImg.src)) {
      await uploadService.deleteImage(oldImg.src);
    }
  }

  hero.bgImages = newBgImages;
  const savedHero = await repo.save(hero);
  logger.info({ action: 'hero_updated', userId });
  return savedHero;
}
