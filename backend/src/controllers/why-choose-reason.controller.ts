import { Request, Response } from 'express';
import * as whyChooseReasonService from '../services/why-choose-reason.service';

export async function getWhyChooseReasons(req: Request, res: Response) {
  res.json(await whyChooseReasonService.getWhyChooseReasons());
}

export async function getWhyChooseReason(req: Request, res: Response) {
  res.json(await whyChooseReasonService.getWhyChooseReason(req.params.id));
}

export async function createWhyChooseReason(req: Request, res: Response) {
  const item = await whyChooseReasonService.createWhyChooseReason(req.body, (req as any).user.id);
  res.status(201).json(item);
}

export async function updateWhyChooseReason(req: Request, res: Response) {
  res.json(await whyChooseReasonService.updateWhyChooseReason(req.params.id, req.body, (req as any).user.id));
}

export async function deleteWhyChooseReason(req: Request, res: Response) {
  await whyChooseReasonService.deleteWhyChooseReason(req.params.id, (req as any).user.id);
  res.status(204).send();
}
