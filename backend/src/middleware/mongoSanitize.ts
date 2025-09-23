import { NextFunction, Request, Response } from 'express';
import mongoSanitize from 'mongo-sanitize';

export const mongoSanitizeMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  if (req.body) sanitizeInPlace(req.body);
  if (req.query) sanitizeInPlace(req.query as Record<string, any>);
  if (req.params) sanitizeInPlace(req.params as Record<string, any>);
  next();
};

function sanitizeInPlace(obj: Record<string, any>) {
  for (const key in obj) {
    obj[key] = mongoSanitize(obj[key]);
  }
}
