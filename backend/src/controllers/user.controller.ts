// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export async function getUsers(req: Request, res: Response) {
  const users = await userService.getUsers();
  res.json(users);
}

export async function getUser(req: Request, res: Response) {
  const { id } = req.params;
  const user = await userService.getUser(id);
  res.json(user);
}

export async function createUser(req: Request, res: Response) {
  const data = req.body;
  const adminId = (req as any).user.id;
  const user = await userService.createUser(data, adminId);
  res.status(201).json(user);
}

export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;
  const adminId = (req as any).user.id;
  const user = await userService.updateUser(id, data, adminId);
  res.json(user);
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  const adminId = (req as any).user.id;
  await userService.deleteUser(id, adminId);
  res.status(204).send();
}
