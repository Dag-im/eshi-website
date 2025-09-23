import { NextFunction, Request, Response } from 'express';
import xss from 'xss';

export const xssCleanMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  if (req.body) sanitizeInPlace(req.body);
  if (req.query) sanitizeInPlace(req.query as Record<string, any>);
  if (req.params) sanitizeInPlace(req.params as Record<string, any>);
  next();
};

function sanitizeInPlace(obj: Record<string, any>) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = xss(obj[key]);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitizeInPlace(obj[key]);
    }
  }
}
