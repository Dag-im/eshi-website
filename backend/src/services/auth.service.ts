import bcrypt from 'bcryptjs';
import { UserEntity } from '../entities/user.entity';
import { ACCEPTED_TEMP_PASSWORDS, DEFAULT_TEMP_PASSWORD } from '../lib/auth-defaults';
import { CustomError, signAccessToken, signRefreshToken, verifyToken } from '../lib/jwt';
import { logger } from '../lib/logger';
import { getRepository } from '../lib/repository';

const SALT_ROUNDS = 12;

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function registerAdmin(email: string, password: string, name?: string, ip?: string) {
  const repo = getRepository(UserEntity);
  const normalizedEmail = normalizeEmail(email);
  const exists = await repo.findOne({ where: { email: normalizedEmail } });
  if (exists)
    throw new CustomError(
      'A user with this email already exists. Please use a different email.',
      400
    );
  const passwordHash = await hashPassword(password);
  const user = await repo.save(
    repo.create({
      email: normalizedEmail,
      name: name || null,
      passwordHash,
      role: 'admin',
      isActive: true,
    })
  );
  logger.info({ action: 'register_admin', email: normalizedEmail, ip });
  return user;
}

export async function loginUser(email: string, password: string, ip?: string) {
  const repo = getRepository(UserEntity);
  const normalizedEmail = normalizeEmail(email);
  let user = await repo.findOne({ where: { email: normalizedEmail } });
  if (!user) {
    // Backward-compatible lookup in case historical records contain
    // accidental casing/whitespace in email values.
    user = await repo
      .createQueryBuilder('user')
      .where('LOWER(TRIM(user.email)) = :email', { email: normalizedEmail })
      .getOne();
  }
  if (!user) {
    logger.warn({ action: 'login_failed', email: normalizedEmail, ip, reason: 'user_not_found' });
    throw new CustomError('Invalid email or password. Please try again.', 401);
  }
  let ok = await comparePassword(password, user.passwordHash);

  if (!ok && user.mustChangePassword) {
    const normalizedInput = password.trim().toLowerCase();
    const enteredKnownTempPassword = ACCEPTED_TEMP_PASSWORDS.some(
      (candidate) => candidate.toLowerCase() === normalizedInput
    );

    if (enteredKnownTempPassword) {
      for (const candidate of ACCEPTED_TEMP_PASSWORDS) {
        const matchesStoredHash = await comparePassword(candidate, user.passwordHash);
        if (!matchesStoredHash) continue;

        ok = true;
        if (candidate !== DEFAULT_TEMP_PASSWORD) {
          // Migrate legacy temporary password hashes to the canonical default.
          user.passwordHash = await hashPassword(DEFAULT_TEMP_PASSWORD);
          await repo.save(user);
        }
        break;
      }
    }
  }

  if (!ok) {
    logger.warn({ action: 'login_failed', email: normalizedEmail, ip, reason: 'invalid_password' });
    throw new CustomError('Invalid email or password. Please try again.', 401);
  }
  if (!user.isActive) {
    logger.warn({ action: 'login_failed', email: normalizedEmail, ip, reason: 'account_disabled' });
    throw new CustomError('Your account is disabled. Please contact support.', 403);
  }

  const accessToken = signAccessToken({ sub: String(user.id), role: user.role });
  const refreshToken = signRefreshToken({ sub: String(user.id), role: user.role });

  const refreshHash = await bcrypt.hash(refreshToken, SALT_ROUNDS);
  user.refreshTokenHash = refreshHash;
  await repo.save(user);

  logger.info({ action: 'login_success', email: normalizedEmail, ip });
  return { user, accessToken, refreshToken, mustChangePassword: user.mustChangePassword };
}

export async function refreshTokens(token: string, ip?: string) {
  const payload = verifyToken<{ sub: string; role: string }>(token);
  const repo = getRepository(UserEntity);
  const user = await repo.findOne({ where: { id: Number(payload.sub) } });
  if (!user || !user.refreshTokenHash) {
    logger.warn({ action: 'refresh_failed', userId: payload.sub, ip, reason: 'invalid_token' });
    throw new CustomError('Invalid refresh token. Please log in again.', 401);
  }

  const ok = await bcrypt.compare(token, user.refreshTokenHash);
  if (!ok) {
    logger.warn({ action: 'refresh_failed', userId: payload.sub, ip, reason: 'hash_mismatch' });
    throw new CustomError('Invalid refresh token. Please log in again.', 401);
  }

  const newAccess = signAccessToken({ sub: String(user.id), role: user.role });
  const newRefresh = signRefreshToken({ sub: String(user.id), role: user.role });
  user.refreshTokenHash = await bcrypt.hash(newRefresh, SALT_ROUNDS);
  await repo.save(user);

  logger.info({ action: 'refresh_success', userId: user.id, ip });
  return { accessToken: newAccess, refreshToken: newRefresh };
}

export async function logoutUser(userId: string, ip?: string) {
  const repo = getRepository(UserEntity);
  const user = await repo.findOne({ where: { id: Number(userId) } });
  if (user) {
    user.refreshTokenHash = null;
    await repo.save(user);
  }
  logger.info({ action: 'logout', userId, ip });
}

export async function resetPassword(userId: string, newPassword: string) {
  const repo = getRepository(UserEntity);
  const user = await repo.findOne({ where: { id: Number(userId) } });
  if (!user) throw new CustomError('User not found.', 404);

  const passwordHash = await hashPassword(newPassword);
  user.passwordHash = passwordHash;
  user.mustChangePassword = false; // Clear the flag after user changes password
  user.refreshTokenHash = null; // Force fresh login
  await repo.save(user);

  logger.info({ action: 'reset_password', userId });
}
