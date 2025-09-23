// src/controllers/impact.controller.ts
import { Request, Response } from 'express';
import { CustomError } from '../lib/jwt';
import * as impactService from '../services/impact.service';

export async function getImpacts(req: Request, res: Response) {
  const impacts = await impactService.getImpacts();
  res.json(impacts);
}

export async function getImpact(req: Request, res: Response) {
  const { id } = req.params;
  const impact = await impactService.getImpact(id);
  res.json(impact);
}

export async function createImpact(req: Request, res: Response) {
  const data = req.body;
  const file = req.file;
  if (!file) throw new CustomError('Logo required.', 400);
  const userId = (req as any).user.id;
  const impact = await impactService.createImpact(data, file, userId);
  res.status(201).json(impact);
}

export async function updateImpact(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;
  const file = req.file;
  const userId = (req as any).user.id;
  const impact = await impactService.updateImpact(id, data, userId, file);
  res.json(impact);
}

export async function deleteImpact(req: Request, res: Response) {
  const { id } = req.params;
  const userId = (req as any).user.id;
  await impactService.deleteImpact(id, userId);
  res.status(204).send();
}
