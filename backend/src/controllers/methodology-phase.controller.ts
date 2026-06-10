import { Request, Response } from 'express';
import * as methodologyPhaseService from '../services/methodology-phase.service';

export async function getMethodologyPhases(req: Request, res: Response) {
  res.json(await methodologyPhaseService.getMethodologyPhases());
}

export async function getMethodologyPhase(req: Request, res: Response) {
  res.json(await methodologyPhaseService.getMethodologyPhase(req.params.id));
}

export async function createMethodologyPhase(req: Request, res: Response) {
  const item = await methodologyPhaseService.createMethodologyPhase(req.body, (req as any).user.id);
  res.status(201).json(item);
}

export async function updateMethodologyPhase(req: Request, res: Response) {
  res.json(await methodologyPhaseService.updateMethodologyPhase(req.params.id, req.body, (req as any).user.id));
}

export async function deleteMethodologyPhase(req: Request, res: Response) {
  await methodologyPhaseService.deleteMethodologyPhase(req.params.id, (req as any).user.id);
  res.status(204).send();
}
