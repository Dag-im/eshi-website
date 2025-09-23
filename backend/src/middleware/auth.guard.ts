import { NextFunction, Request, Response } from 'express';
import { CustomError, verifyToken } from '../lib/jwt';
import { UserModel } from '../models/user.model';

export const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  // First check Authorization header
  const header = req.headers.authorization;
  if (header?.startsWith('Bearer ')) {
    token = header.split(' ')[1];
  }

  // If not found, check cookies
  if (!token && req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    throw new CustomError('No token provided (header or cookie).', 401);
  }

  const payload = verifyToken<{ sub: string; role: string }>(token);
  const user = await UserModel.findById(payload.sub);

  if (!user || user.role !== 'admin') {
    throw new CustomError('Access denied. Admin privileges required.', 403);
  }

  (req as any).user = { id: user._id?.toString(), role: user.role, email: user.email };
  next();
};
