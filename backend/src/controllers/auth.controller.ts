import { Request, Response } from 'express';
import { config } from '../lib/config';
import { CustomError, verifyToken } from '../lib/jwt';
import { sendMail } from '../lib/mailer';
import * as authService from '../services/auth.service';
import { getUser } from '../services/user.service';

export async function register(req: Request, res: Response) {
  const { email, password, name } = req.body;
  const user = await authService.registerAdmin(email, password, name, req.ip);
  res.status(201).json({ id: user._id, email: user.email, name: user.name });
}

export async function getProfile(req: Request, res: Response) {
  const userId = (req as any).user.sub;
  const user = await getUser(userId);
  res.status(200).json({ id: user.id, email: user.email, name: user.name, role: user.role });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await authService.loginUser(email, password, req.ip);
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: config.COOKIE_SECURE,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 15, // 15 minutes
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.COOKIE_SECURE,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
  res.json({
    user: { id: user._id, email: user.email, name: user.name, role: user.role },
  });
}

export async function refresh(req: Request, res: Response) {
  const token = req.cookies?.refreshToken;
  if (!token) throw new CustomError('No refresh token provided. Please log in.', 401);
  const tokens = await authService.refreshTokens(token, req.ip);
  res.cookie('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    secure: config.COOKIE_SECURE,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
  res.json({ accessToken: tokens.accessToken });
}

export async function logout(req: Request, res: Response) {
  const token = req.cookies?.refreshToken;
  if (token) {
    const payload = verifyToken<{ sub: string }>(token);
    await authService.logoutUser(payload.sub, req.ip);
  }
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully.' });
}

export async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body;
  const token = await authService.createPasswordResetToken(email, req.ip);
  if (token) {
    const link = `${config.APP_URL}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
    const html = `
      <p>Hello,</p>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${link}">${link}</a>
      <p>If you didn't request this, please ignore this email.</p>
      <p>This link expires in 1 hour.</p>
    `;
    await sendMail(email, 'Password Reset Request', html);
  }
  res.json({ message: 'If an account exists with this email, a reset link has been sent.' });
}

export async function resetPassword(req: Request, res: Response) {
  const { email, token, newPassword } = req.body;
  await authService.resetPassword(email, token, newPassword, req.ip);
  res.json({ message: 'Password reset successfully. Please log in with your new password.' });
}
