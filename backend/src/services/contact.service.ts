// src/services/contact.service.ts
import { CustomError } from '../lib/jwt';
import { logger } from '../lib/logger';
import { ContactMessageModel } from '../models/contact.model';

export async function submitContactMessage(data: { name: string; email: string; message: string }) {
  const message = new ContactMessageModel({ ...data });
  await message.save();
  logger.info({ action: 'contact_message_submitted', messageId: message._id });
  return message;
}

export async function getContactMessages() {
  return ContactMessageModel.find().sort('-createdAt');
}

export async function getContactMessage(id: string) {
  const message = await ContactMessageModel.findById(id);
  if (!message) throw new CustomError('Contact message not found.', 404);
  return message;
}

export async function markContactMessageSeen(id: string, userId: string) {
  const message = await ContactMessageModel.findByIdAndUpdate(id, { seen: true }, { new: true });
  if (!message) throw new CustomError('Contact message not found.', 404);
  logger.info({ action: 'contact_message_marked_seen', messageId: id, userId });
  return message;
}
