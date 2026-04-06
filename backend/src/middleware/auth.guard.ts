import { NextFunction, Request, Response } from 'express';
import { UserEntity } from '../entities/user.entity';
import { CustomError, verifyToken } from '../lib/jwt';
import { getRepository } from '../lib/repository';

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
  const user = await getRepository(UserEntity).findOne({ where: { id: Number(payload.sub) } });

  if (!user || !user.isActive || user.role !== 'admin') {
    throw new CustomError('Access denied. Admin privileges required.', 403);
  }

  (req as any).user = {
    id: String(user.id),
    role: user.role,
    email: user.email,
    sub: String(user.id),
    isActive: user.isActive,
    mustChangePassword: user.mustChangePassword,
  };
  next();
};
