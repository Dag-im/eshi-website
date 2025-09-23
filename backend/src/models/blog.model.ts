// src/models/blog.model.ts
import { Document, Schema, model } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  excerpt: string;
  slug: string;
  imageUrl: string;
  imagePublicId?: string;
  category: string;
  date: Date;
  content: string;
  featured: boolean;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    content: { type: String, required: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const BlogModel = model<IBlog>('Blog', BlogSchema);
