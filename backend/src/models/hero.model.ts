// src/models/hero.model.ts
import { Document, Schema, model } from 'mongoose';

export interface IHero extends Document {
  bgImages: { src: string; alt: string; publicId?: string }[];
}

const HeroSchema = new Schema<IHero>(
  {
    bgImages: [
      {
        src: { type: String, required: true },
        alt: { type: String, default: '' },
        publicId: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const HeroModel = model<IHero>('Hero', HeroSchema);
