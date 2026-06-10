import { Request, Response } from 'express';
import * as serviceCardService from '../services/service-card.service';

export async function getServiceCards(req: Request, res: Response) {
  res.json(await serviceCardService.getServiceCards());
}

export async function getServiceCard(req: Request, res: Response) {
  res.json(await serviceCardService.getServiceCard(req.params.id));
}

export async function createServiceCard(req: Request, res: Response) {
  const item = await serviceCardService.createServiceCard(req.body, (req as any).user.id);
  res.status(201).json(item);
}

export async function updateServiceCard(req: Request, res: Response) {
  res.json(await serviceCardService.updateServiceCard(req.params.id, req.body, (req as any).user.id));
}

export async function deleteServiceCard(req: Request, res: Response) {
  await serviceCardService.deleteServiceCard(req.params.id, (req as any).user.id);
  res.status(204).send();
}
