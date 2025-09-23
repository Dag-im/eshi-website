// src/services/hero.service.ts
import { logger } from '../lib/logger';
import { HeroModel } from '../models/hero.model';
import * as uploadService from './upload.service';

export async function getHero() {
  let hero = await HeroModel.findOne();
  if (!hero) {
    hero = new HeroModel({ bgImages: [] });
    await hero.save();
  }
  return hero;
}

export async function updateHero(
  bgImages: { src?: string; alt: string; file?: Express.Multer.File; publicId?: string }[],
  userId: string
) {
  const hero = await getHero();

  const newBgImages = [];
  for (const img of bgImages) {
    let src = img.src;
    let publicId = img.publicId;
    if (img.file) {
      const upload = await uploadService.uploadImage(img.file);
      src = upload.url;
      publicId = upload.publicId;
    }
    if (src) newBgImages.push({ src, alt: img.alt, publicId });
  }

  for (const oldImg of hero.bgImages) {
    if (!newBgImages.some((newImg) => newImg.publicId === oldImg.publicId) && oldImg.publicId) {
      await uploadService.deleteImage(oldImg.publicId);
    }
  }

  hero.bgImages = newBgImages;
  await hero.save();
  logger.info({ action: 'hero_updated', userId });
  return hero;
}
