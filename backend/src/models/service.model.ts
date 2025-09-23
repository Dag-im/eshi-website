// src/models/service.model.ts
import { Document, Schema, model } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  icon: string;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { timestamps: true }
);

export const ServiceModel = model<IService>('Service', ServiceSchema);
