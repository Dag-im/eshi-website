// src/models/presentation.model.ts
import { Document, Schema, model } from 'mongoose';

export interface IPresentation extends Document {
  title: string;
  description: string;
}

const PresentationSchema = new Schema<IPresentation>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const PresentationModel = model<IPresentation>('Presentation', PresentationSchema);
