// src/middleware/validationMiddleware.ts
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../lib/jwt';

// Use require() to avoid ESM/CommonJS typing mismatch with express-validator
const expressValidator: any = require('express-validator');
const { validationResult } = expressValidator;

export const validationMiddleware = (validations: any[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    // Run all validations against the request
    await Promise.all(validations.map((validation) => validation.run(req)));

    // Collect results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formatted = errors.array().map((err: any) => ({
        field: err.param,
        message: err.msg,
      }));

      // Keep using your CustomError shape (message, status).
      // We stringify the validation details so the errorHandler can parse / return structured JSON.
      throw new CustomError(JSON.stringify({ validation: formatted }), 400);
    }

    return next();
  };
};
