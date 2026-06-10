import { Request, Response } from 'express';
import * as aboutService from '../services/about.service';

export async function getAbout(req: Request, res: Response) {
  const about = await aboutService.getAbout();
  res.json(about);
}

export async function createAbout(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const about = await aboutService.createAbout(req.body, userId);
  res.status(201).json(about);
}
