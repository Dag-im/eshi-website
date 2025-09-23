// src/controllers/team.controller.ts
import { Request, Response } from 'express';
import { CustomError } from '../lib/jwt';
import * as teamService from '../services/team.service';

export async function getTeamMembers(req: Request, res: Response) {
  const members = await teamService.getTeamMembers();
  res.json(members);
}

export async function getTeamMember(req: Request, res: Response) {
  const { id } = req.params;
  const member = await teamService.getTeamMember(id);
  res.json(member);
}

export async function createTeamMember(req: Request, res: Response) {
  const data = req.body;
  const file = req.file;
  if (!file) throw new CustomError('Image required.', 400);
  const userId = (req as any).user.id;
  const member = await teamService.createTeamMember(data, file, userId);
  res.status(201).json(member);
}

export async function updateTeamMember(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;
  const file = req.file;
  const userId = (req as any).user.id;
  const member = await teamService.updateTeamMember(id, data, userId, file);
  res.json(member);
}

export async function deleteTeamMember(req: Request, res: Response) {
  const { id } = req.params;
  const userId = (req as any).user.id;
  await teamService.deleteTeamMember(id, userId);
  res.status(204).send();
}
