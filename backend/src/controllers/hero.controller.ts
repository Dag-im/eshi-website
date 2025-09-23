// src/controllers/hero.controller.ts
import { Request, Response } from 'express';
import { CustomError } from '../lib/jwt';
import * as heroService from '../services/hero.service';

export async function getHero(req: Request, res: Response) {
  const hero = await heroService.getHero();
  res.json(hero);
}

export async function updateHero(req: Request, res: Response) {
  const existingStr = req.body.existing;
  const altsStr = req.body.alts;
  const files = (req.files as Express.Multer.File[]) || [];

  let existing: { src?: string; alt: string; publicId?: string; file?: Express.Multer.File }[] = [];
  let alts: string[] = [];

  try {
    if (existingStr) existing = JSON.parse(existingStr);
    if (altsStr) alts = JSON.parse(altsStr);
  } catch {
    throw new CustomError('Invalid existing or alts format.', 400);
  }

  if (files.length !== alts.length)
    throw new CustomError('Number of new images and alts must match.', 400);

  const bgImages = [...existing];

  for (let i = 0; i < files.length; i++) {
    bgImages.push({ file: files[i], alt: alts[i] || '' });
  }

  const userId = (req as any).user.id;
  const hero = await heroService.updateHero(bgImages, userId);
  res.json(hero);
}
