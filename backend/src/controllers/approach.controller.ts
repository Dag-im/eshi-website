import { Request, Response } from 'express';
import * as approachService from '../services/approach.service';

export async function getApproaches(req: Request, res: Response) {
  res.json(await approachService.getApproaches());
}

export async function getApproach(req: Request, res: Response) {
  res.json(await approachService.getApproach(req.params.id));
}

export async function createApproach(req: Request, res: Response) {
  const item = await approachService.createApproach(req.body, (req as any).user.id);
  res.status(201).json(item);
}

export async function updateApproach(req: Request, res: Response) {
  res.json(await approachService.updateApproach(req.params.id, req.body, (req as any).user.id));
}

export async function deleteApproach(req: Request, res: Response) {
  await approachService.deleteApproach(req.params.id, (req as any).user.id);
  res.status(204).send();
}
