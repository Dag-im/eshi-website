// src/routes/service.routes.ts
import express from 'express';
import * as serviceCtrl from '../controllers/service.controller';
import { asyncHandler } from '../middleware/asyncHandler';
import { authGuard } from '../middleware/auth.guard';
import { errorHandler } from '../middleware/errorHandler';
import { validationMiddleware } from '../middleware/validationMiddleware';

const expressValidator: any = require('express-validator');
const { body } = expressValidator;

const router = express.Router();

router.get('/', asyncHandler(serviceCtrl.getServices));

router.get('/:id', asyncHandler(serviceCtrl.getService));

router.post(
  '/',
  authGuard,
  validationMiddleware([
    body('title').isString().withMessage('Title is required.'),
    body('description').isString().withMessage('Description is required.'),
    body('icon').isString().withMessage('Icon is required.'),
  ]),
  asyncHandler(serviceCtrl.createService)
);

router.put(
  '/:id',
  authGuard,
  validationMiddleware([
    body('title').optional().isString(),
    body('description').optional().isString(),
    body('icon').optional().isString(),
  ]),
  asyncHandler(serviceCtrl.updateService)
);

router.delete('/:id', authGuard, asyncHandler(serviceCtrl.deleteService));

router.use(errorHandler);

export default router;
