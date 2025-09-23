// src/controllers/contact.controller.ts
import { Request, Response } from 'express';
import * as contactService from '../services/contact.service';

export async function submitContactMessage(req: Request, res: Response) {
  const data = req.body;
  const message = await contactService.submitContactMessage(data);
  res.status(201).json({ message: 'Message sent successfully', data: message });
}

export async function getContactMessages(req: Request, res: Response) {
  const messages = await contactService.getContactMessages();
  res.json(messages);
}

export async function getContactMessage(req: Request, res: Response) {
  const { id } = req.params;
  const message = await contactService.getContactMessage(id);
  res.json(message);
}

export async function markContactMessageSeen(req: Request, res: Response) {
  const { id } = req.params;
  const userId = (req as any).user.id;
  const message = await contactService.markContactMessageSeen(id, userId);
  res.json(message);
}
