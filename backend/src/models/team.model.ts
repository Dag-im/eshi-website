// src/models/team.model.ts
import { Document, Schema, model } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  imagePublicId?: string;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String },
  },
  { timestamps: true }
);

export const TeamMemberModel = model<ITeamMember>('TeamMember', TeamMemberSchema);
