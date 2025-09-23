// src/models/impact.model.ts
import { Document, Schema, model } from 'mongoose';

export interface IImpact extends Document {
  name: string;
  logo: string;
  logoPublicId?: string;
  desc: string;
  stat: string;
}

const ImpactSchema = new Schema<IImpact>(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true },
    logoPublicId: { type: String },
    desc: { type: String, required: true },
    stat: { type: String, required: true },
  },
  { timestamps: true }
);

export const ImpactModel = model<IImpact>('Impact', ImpactSchema);
