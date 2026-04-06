// src/services/user.service.ts
import bcrypt from 'bcryptjs';
import { UserEntity } from '../entities/user.entity';
import { CustomError } from '../lib/jwt';
import { logger } from '../lib/logger';
import { getRepository } from '../lib/repository';

export async function getUsers() {
  return getRepository(UserEntity).find({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      mustChangePassword: true,
      createdAt: true,
      updatedAt: true,
      passwordHash: false,
      refreshTokenHash: false,
    },
    order: { createdAt: 'DESC' },
  });
}

export async function getUser(id: string) {
  const user = await getRepository(UserEntity).findOne({
    where: { id: Number(id) },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      mustChangePassword: true,
      createdAt: true,
      updatedAt: true,
      passwordHash: false,
      refreshTokenHash: false,
    },
  });
  if (!user) throw new CustomError('User not found.', 404);
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    isActive: user.isActive,
    mustChangePassword: user.mustChangePassword,
  };
}

export async function createUser(
  data: { name: string; email: string; isActive?: boolean },
  adminId: string
) {
  const repo = getRepository(UserEntity);
  const existing = await repo.findOne({ where: { email: data.email } });
  if (existing) throw new CustomError('Email already in use.', 400);

  const temporaryPassword = 'ADMIN@123';
  const passwordHash = await bcrypt.hash(temporaryPassword, 10);

  const user = await repo.save(repo.create({
    name: data.name,
    email: data.email,
    passwordHash,
    isActive: data.isActive ?? true,
    role: 'admin',
    refreshTokenHash: null,
    mustChangePassword: true,
  }));

  logger.info({ action: 'user_created', userId: user.id, adminId });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    isActive: user.isActive,
    mustChangePassword: user.mustChangePassword,
    temporaryPassword,
  };
}

export async function updateUser(
  id: string,
  data: { name?: string; email?: string; isActive?: boolean },
  adminId: string
) {
  const repo = getRepository(UserEntity);
  const user = await repo.findOne({ where: { id: Number(id) } });
  if (!user) throw new CustomError('User not found.', 404);

  if (String(user.id) === adminId && data.isActive === false) {
    throw new CustomError('You cannot deactivate your own account.', 400);
  }

  if (data.email && data.email !== user.email) {
    const existing = await repo.findOne({ where: { email: data.email } });
    if (existing && existing.id !== user.id) {
      throw new CustomError('Email already in use.', 400);
    }
  }

  const updates = Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined)
  );

  Object.assign(user, updates);
  const savedUser = await repo.save(user);
  logger.info({ action: 'user_updated', userId: id, adminId });
  return {
    id: savedUser.id,
    email: savedUser.email,
    name: savedUser.name,
    role: savedUser.role,
    isActive: savedUser.isActive,
    mustChangePassword: savedUser.mustChangePassword,
  };
}

export async function deleteUser(id: string, adminId: string) {
  const targetUserId = Number(id);
  const actingAdminId = Number(adminId);

  if (!Number.isInteger(targetUserId) || !Number.isInteger(actingAdminId)) {
    throw new CustomError('Invalid user id.', 400);
  }

  if (targetUserId === actingAdminId) {
    throw new CustomError('You cannot delete your own account.', 400);
  }

  const repo = getRepository(UserEntity);
  const user = await repo.findOne({ where: { id: targetUserId } });
  if (!user) throw new CustomError('User not found.', 404);
  await repo.remove(user);
  logger.info({ action: 'user_deleted', userId: id, adminId });
  return user.id;
}

// services/user.service.ts
export async function resetUserPassword(userId: string, adminId: string) {
  const defaultPassword = 'ADMIN@123'; // or configurable from env
  const passwordHash = await bcrypt.hash(defaultPassword, 10);

  const repo = getRepository(UserEntity);
  const user = await repo.findOne({ where: { id: Number(userId) } });
  if (!user) throw new CustomError('User not found.', 404);
  user.passwordHash = passwordHash;
  user.mustChangePassword = true;
  user.refreshTokenHash = null;
  const savedUser = await repo.save(user);

  logger.info({ action: 'password_reset', userId, adminId });
  return {
    id: savedUser.id,
    email: savedUser.email,
    name: savedUser.name,
    role: savedUser.role,
    isActive: savedUser.isActive,
    mustChangePassword: savedUser.mustChangePassword,
  };
}
