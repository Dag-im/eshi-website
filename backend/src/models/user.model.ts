import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name?: string;
  passwordHash: string;
  role: 'admin';
  isActive: boolean;
  refreshTokenHash?: string | null;
  passwordResetTokenHash?: string | null;
  passwordResetExpiresAt?: Date | null;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin'], default: 'admin' },
    isActive: { type: Boolean, default: true },
    refreshTokenHash: { type: String, default: null },
    passwordResetTokenHash: { type: String, default: null },
    passwordResetExpiresAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const UserModel = model<IUser>('User', UserSchema);
