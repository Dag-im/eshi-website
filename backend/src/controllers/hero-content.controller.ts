import { Request, Response } from 'express';
import * as heroContentService from '../services/hero-content.service';

export async function getHeroContents(req: Request, res: Response) {
  const heroContents = await heroContentService.getHeroContents();
  res.json(heroContents);
}

export async function getHeroContent(req: Request, res: Response) {
  const heroContent = await heroContentService.getHeroContent(req.params.id);
  res.json(heroContent);
}

export async function createHeroContent(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const heroContent = await heroContentService.createHeroContent(req.body, userId);
  res.status(201).json(heroContent);
}

export async function updateHeroContent(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const heroContent = await heroContentService.updateHeroContent(req.params.id, req.body, userId);
  res.json(heroContent);
}

export async function deleteHeroContent(req: Request, res: Response) {
  const userId = (req as any).user.id;
  await heroContentService.deleteHeroContent(req.params.id, userId);
  res.status(204).send();
}
