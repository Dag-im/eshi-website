import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../lib/jwt';

export const validateDto = <T extends object>(
  dtoClass: new () => T,
  source: 'body' | 'query' | 'params' = 'body'
) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const dto = plainToInstance(dtoClass, req[source]);
    const errors = await validate(dto as object, {
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      const validation = errors.flatMap((error) =>
        Object.values(error.constraints || {}).map((message) => ({
          field: error.property,
          message,
        }))
      );

      throw new CustomError(JSON.stringify({ validation }), 400);
    }

    req[source] = dto as Request[typeof source];
    next();
  };
};
