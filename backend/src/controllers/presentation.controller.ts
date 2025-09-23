// src/controllers/presentation.controller.ts
import { Request, Response } from 'express';
import * as presentationService from '../services/presentation.service';

export async function getPresentations(req: Request, res: Response) {
  const presentations = await presentationService.getPresentations();
  res.json(presentations);
}

export async function getPresentation(req: Request, res: Response) {
  const { id } = req.params;
  const presentation = await presentationService.getPresentation(id);
  res.json(presentation);
}

export async function createPresentation(req: Request, res: Response) {
  const data = req.body;
  const userId = (req as any).user.id;
  const presentation = await presentationService.createPresentation(data, userId);
  res.status(201).json(presentation);
}

export async function updatePresentation(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;
  const userId = (req as any).user.id;
  const presentation = await presentationService.updatePresentation(id, data, userId);
  res.json(presentation);
}

export async function deletePresentation(req: Request, res: Response) {
  const { id } = req.params;
  const userId = (req as any).user.id;
  await presentationService.deletePresentation(id, userId);
  res.status(204).send();
}
