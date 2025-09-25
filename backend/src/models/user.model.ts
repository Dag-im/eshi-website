import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name?: string;
  passwordHash: string;
  role: 'admin';
  isActive: boolean;
  refreshTokenHash?: string | null;
  mustChangePassword: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin'], default: 'admin' },
    isActive: { type: Boolean, default: true },
    refreshTokenHash: { type: String, default: null },
    mustChangePassword: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserModel = model<IUser>('User', UserSchema);
