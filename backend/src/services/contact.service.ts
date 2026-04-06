// src/services/contact.service.ts
import { ContactMessageEntity } from '../entities/contact-message.entity';
import { CustomError } from '../lib/jwt';
import { logger } from '../lib/logger';
import { getRepository } from '../lib/repository';

export async function submitContactMessage(data: { name: string; email: string; message: string }) {
  const repo = getRepository(ContactMessageEntity);
  const message = repo.create({ ...data, seen: false });
  const savedMessage = await repo.save(message);
  logger.info({ action: 'contact_message_submitted', messageId: savedMessage.id });
  return savedMessage;
}

export async function getContactMessages() {
  return getRepository(ContactMessageEntity).find({ order: { createdAt: 'DESC' } });
}

export async function getContactMessage(id: string) {
  const message = await getRepository(ContactMessageEntity).findOne({ where: { id: Number(id) } });
  if (!message) throw new CustomError('Contact message not found.', 404);
  return message;
}

export async function markContactMessageSeen(id: string, userId: string) {
  const repo = getRepository(ContactMessageEntity);
  const message = await repo.findOne({ where: { id: Number(id) } });
  if (!message) throw new CustomError('Contact message not found.', 404);
  message.seen = true;
  const savedMessage = await repo.save(message);
  logger.info({ action: 'contact_message_marked_seen', messageId: id, userId });
  return savedMessage;
}
