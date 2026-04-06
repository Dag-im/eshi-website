import { Request, Response } from 'express';
import { CustomError, verifyToken } from '../lib/jwt';
import * as authService from '../services/auth.service';
import { getUser } from '../services/user.service';

function getCookieBaseOptions() {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? ('none' as const) : ('lax' as const),
    path: '/',
    ...(isProduction ? { domain: '.eshiconsultancy.org' } : {}),
  };
}

export async function register(req: Request, res: Response) {
  const { email, password, name } = req.body;
  const user = await authService.registerAdmin(email, password, name, req.ip);
  res.status(201).json({ id: user.id, email: user.email, name: user.name });
}

export async function getProfile(req: Request, res: Response) {
  const userId = (req as any).user.sub;
  const user = await getUser(userId);
  res.status(200).json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    isActive: user.isActive,
    mustChangePassword: user.mustChangePassword,
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken, mustChangePassword } = await authService.loginUser(
    email,
    password,
    req.ip
  );
  const cookieOptions = getCookieBaseOptions();

  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: 1000 * 60 * 15,
  });
  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
  res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      isActive: user.isActive,
      role: user.role,
      mustChangePassword,
    },
  });
}

export async function refresh(req: Request, res: Response) {
  const token = req.cookies?.refreshToken;
  if (!token) throw new CustomError('No refresh token provided. Please log in.', 401);
  const tokens = await authService.refreshTokens(token, req.ip);
  const cookieOptions = getCookieBaseOptions();

  res.cookie('accessToken', tokens.accessToken, {
    ...cookieOptions,
    maxAge: 1000 * 60 * 15,
  });
  res.cookie('refreshToken', tokens.refreshToken, {
    ...cookieOptions,
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
  res.json({ message: 'Tokens refreshed successfully.' });
}

export async function logout(req: Request, res: Response) {
  const token = req.cookies?.refreshToken;
  if (token) {
    const payload = verifyToken<{ sub: string }>(token);
    await authService.logoutUser(payload.sub, req.ip);
  }
  const cookieOptions = getCookieBaseOptions();

  res.clearCookie('accessToken', cookieOptions);
  res.clearCookie('refreshToken', cookieOptions);
  res.json({ message: 'Logged out successfully.' });
}

export async function resetPassword(req: Request, res: Response) {
  const { userId, newPassword } = req.body;

  if (!userId || !newPassword) {
    throw new CustomError('User ID and new password are required.', 400);
  }

  await authService.resetPassword(userId, newPassword);

  res.json({ message: 'Password changed successfully. You can now use your new password.' });
}
