import bcrypt from 'bcryptjs';
import { CustomError, signAccessToken, signRefreshToken, verifyToken } from '../lib/jwt';
import { logger } from '../lib/logger';
import { UserModel } from '../models/user.model';

const SALT_ROUNDS = 12;

export async function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function registerAdmin(email: string, password: string, name?: string, ip?: string) {
  const exists = await UserModel.findOne({ email });
  if (exists)
    throw new CustomError(
      'A user with this email already exists. Please use a different email.',
      400
    );
  const passwordHash = await hashPassword(password);
  const user = new UserModel({ email, name, passwordHash, role: 'admin' });
  await user.save();
  logger.info({ action: 'register_admin', email, ip });
  return user;
}

export async function loginUser(email: string, password: string, ip?: string) {
  const user = await UserModel.findOne({ email });
  if (!user) {
    logger.warn({ action: 'login_failed', email, ip, reason: 'user_not_found' });
    throw new CustomError('Invalid email or password. Please try again.', 401);
  }
  const ok = await comparePassword(password, user.passwordHash);
  if (!ok) {
    logger.warn({ action: 'login_failed', email, ip, reason: 'invalid_password' });
    throw new CustomError('Invalid email or password. Please try again.', 401);
  }
  if (!user.isActive) {
    logger.warn({ action: 'login_failed', email, ip, reason: 'account_disabled' });
    throw new CustomError('Your account is disabled. Please contact support.', 403);
  }

  console.log('User._id in login:', user._id);

  const accessToken = signAccessToken({ sub: user._id?.toString(), role: user.role });
  const refreshToken = signRefreshToken({ sub: user._id?.toString(), role: user.role });

  const refreshHash = await bcrypt.hash(refreshToken, SALT_ROUNDS);
  user.refreshTokenHash = refreshHash;
  await user.save();

  logger.info({ action: 'login_success', email, ip });
  return { user, accessToken, refreshToken, mustChangePassword: user.mustChangePassword };
}

export async function refreshTokens(token: string, ip?: string) {
  const payload = verifyToken<{ sub: string; role: string }>(token);
  const user = await UserModel.findById(payload.sub);
  if (!user || !user.refreshTokenHash) {
    logger.warn({ action: 'refresh_failed', userId: payload.sub, ip, reason: 'invalid_token' });
    throw new CustomError('Invalid refresh token. Please log in again.', 401);
  }

  const ok = await bcrypt.compare(token, user.refreshTokenHash);
  if (!ok) {
    logger.warn({ action: 'refresh_failed', userId: payload.sub, ip, reason: 'hash_mismatch' });
    throw new CustomError('Invalid refresh token. Please log in again.', 401);
  }

  const newAccess = signAccessToken({ sub: user._id?.toString(), role: user.role });
  const newRefresh = signRefreshToken({ sub: user._id?.toString(), role: user.role });
  user.refreshTokenHash = await bcrypt.hash(newRefresh, SALT_ROUNDS);
  await user.save();

  logger.info({ action: 'refresh_success', userId: user._id, ip });
  return { accessToken: newAccess, refreshToken: newRefresh };
}

export async function logoutUser(userId: string, ip?: string) {
  await UserModel.findByIdAndUpdate(userId, { $set: { refreshTokenHash: null } });
  logger.info({ action: 'logout', userId, ip });
}

export async function resetPassword(userId: string, newPassword: string) {
  const user = await UserModel.findById(userId);
  if (!user) throw new CustomError('User not found.', 404);

  const passwordHash = await hashPassword(newPassword);
  user.passwordHash = passwordHash;
  user.mustChangePassword = false; // Clear the flag after user changes password
  user.refreshTokenHash = null; // Force fresh login
  await user.save();

  logger.info({ action: 'reset_password', userId });
}
