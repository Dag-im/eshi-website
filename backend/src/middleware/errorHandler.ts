import { NextFunction, Request, Response } from 'express';
import { config } from '../lib/config';
import { logger } from '../lib/logger';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
  });

  const status = err.status || 500;
  const message =
    status >= 500 ? 'An unexpected error occurred. Please try again later.' : err.message;

  res.status(status).json({
    error: {
      message,
      ...(config.NODE_ENV === 'development' && { details: err.stack }),
    },
  });
}
