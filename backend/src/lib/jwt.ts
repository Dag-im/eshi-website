import { Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from './config';

if (!config.JWT_SECRET) throw new Error('JWT_SECRET not set');

const ACCESS_EXPIRES = config.JWT_ACCESS_EXPIRY || '15m';
const REFRESH_EXPIRES = config.JWT_REFRESH_EXPIRY || '30d';
const SECRET: string = config.JWT_SECRET;

// Cast expiresIn properly
const accessExpires: SignOptions['expiresIn'] = ACCESS_EXPIRES as any;
const refreshExpires: SignOptions['expiresIn'] = REFRESH_EXPIRES as any;

export function signAccessToken(payload: object) {
  return jwt.sign(payload as any, SECRET, { expiresIn: accessExpires });
}

export function signRefreshToken(payload: object) {
  return jwt.sign(payload as any, SECRET, { expiresIn: refreshExpires });
}

export function verifyToken<T = any>(token: string): T {
  try {
    return jwt.verify(token, SECRET) as T;
  } catch (err: any) {
    if (err?.name === 'TokenExpiredError') {
      throw new CustomError('Token has expired. Please log in again.', 401);
    }
    throw new CustomError('Invalid token. Please log in again.', 401);
  }
}

// Extend Request so TS knows cookies & user exist
interface AuthenticatedRequest extends Request {
  cookies: { [key: string]: string };
  user?: any;
}

export function authenticate(req: AuthenticatedRequest, res: Response, next: Function) {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({ error: 'No access token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET) as any;
    req.user = decoded;
    console.log('Decoded JWT:', decoded);

    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

class CustomError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export { CustomError };
