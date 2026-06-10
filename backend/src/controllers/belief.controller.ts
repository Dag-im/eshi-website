import { Request, Response } from 'express';
import * as beliefService from '../services/belief.service';

export async function getBeliefs(req: Request, res: Response) {
  const beliefs = await beliefService.getBeliefs();
  res.json(beliefs);
}

export async function getBelief(req: Request, res: Response) {
  const belief = await beliefService.getBelief(req.params.id);
  res.json(belief);
}

export async function createBelief(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const belief = await beliefService.createBelief(req.body, userId);
  res.status(201).json(belief);
}

export async function updateBelief(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const belief = await beliefService.updateBelief(req.params.id, req.body, userId);
  res.json(belief);
}

export async function deleteBelief(req: Request, res: Response) {
  const userId = (req as any).user.id;
  await beliefService.deleteBelief(req.params.id, userId);
  res.status(204).send();
}
