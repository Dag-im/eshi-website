// src/models/contact.model.ts
import { Document, Schema, model } from 'mongoose';

export interface IContactMessage extends Document {
  name: string;
  email: string;
  message: string;
  seen: boolean;
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    seen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ContactMessageModel = model<IContactMessage>('ContactMessage', ContactMessageSchema);
