// src/controllers/service.controller.ts
import { Request, Response } from 'express';
import * as serviceService from '../services/service.service';

export async function getServices(req: Request, res: Response) {
  const services = await serviceService.getServices();
  res.json(services);
}

export async function getService(req: Request, res: Response) {
  const { id } = req.params;
  const service = await serviceService.getService(id);
  res.json(service);
}

export async function createService(req: Request, res: Response) {
  const data = req.body;
  const userId = (req as any).user.id;
  const service = await serviceService.createService(data, userId);
  res.status(201).json(service);
}

export async function updateService(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;
  const userId = (req as any).user.id;
  const service = await serviceService.updateService(id, data, userId);
  res.json(service);
}

export async function deleteService(req: Request, res: Response) {
  const { id } = req.params;
  const userId = (req as any).user.id;
  await serviceService.deleteService(id, userId);
  res.status(204).send();
}
