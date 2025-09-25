// src/services/user.service.ts
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { CustomError } from '../lib/jwt';
import { logger } from '../lib/logger';
import { UserModel } from '../models/user.model';

export async function getUsers() {
  return UserModel.find().select(
    '-passwordHash -refreshTokenHash -passwordResetTokenHash -passwordResetExpiresAt'
  );
}

export async function getUser(id: string) {
  const objectId = new mongoose.Types.ObjectId(id);
  console.log('Fetching user with ID:', objectId);
  const user = await UserModel.findById(objectId).select(
    '-passwordHash -refreshTokenHash -passwordResetTokenHash -passwordResetExpiresAt'
  );
  if (!user) throw new CustomError('User not found.', 404);
  return {
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
    mustChangePassword: user.mustChangePassword,
  };
}

export async function createUser(data: { name: string; email: string }, adminId: string) {
  const existing = await UserModel.findOne({ email: data.email });
  if (existing) throw new CustomError('Email already in use.', 400);

  const passwordHash = await bcrypt.hash('ADMIN@123', 10);

  const user = await UserModel.create({
    name: data.name,
    email: data.email,
    passwordHash,
    isActive: true,
    mustChangePassword: true,
  });

  logger.info({ action: 'user_created', userId: user._id, adminId });

  return user._id;
}

export async function updateUser(
  id: string,
  data: { name?: string; isActive?: boolean },
  adminId: string
) {
  const user = await UserModel.findByIdAndUpdate(id, data, { new: true }).select('-passwordHash');
  if (!user) throw new CustomError('User not found.', 404);
  logger.info({ action: 'user_updated', userId: id, adminId });
  return user;
}

export async function deleteUser(id: string, adminId: string) {
  const user = await UserModel.findByIdAndDelete(id);
  if (!user) throw new CustomError('User not found.', 404);
  logger.info({ action: 'user_deleted', userId: id, adminId });
  return user._id;
}

// services/user.service.ts
export async function resetUserPassword(userId: string, adminId: string) {
  const defaultPassword = 'ADMIN@123'; // or configurable from env
  const passwordHash = await bcrypt.hash(defaultPassword, 10);

  const user = await UserModel.findByIdAndUpdate(
    userId,
    { passwordHash, mustChangePassword: true },
    { new: true }
  ).select('-passwordHash');

  if (!user) throw new CustomError('User not found.', 404);

  logger.info({ action: 'password_reset', userId, adminId });
  return user;
}
