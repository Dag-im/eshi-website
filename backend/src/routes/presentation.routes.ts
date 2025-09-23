// src/routes/presentation.routes.ts
import express from 'express';
import * as presentationCtrl from '../controllers/presentation.controller';
import { asyncHandler } from '../middleware/asyncHandler';
import { authGuard } from '../middleware/auth.guard';
import { errorHandler } from '../middleware/errorHandler';
import { validationMiddleware } from '../middleware/validationMiddleware';

const expressValidator: any = require('express-validator');
const { body } = expressValidator;

const router = express.Router();

router.get('/', asyncHandler(presentationCtrl.getPresentations));

router.get('/:id', asyncHandler(presentationCtrl.getPresentation));

router.post(
  '/',
  authGuard,
  validationMiddleware([
    body('title').isString().withMessage('Title is required.'),
    body('description').isString().withMessage('Description is required.'),
  ]),
  asyncHandler(presentationCtrl.createPresentation)
);

router.put(
  '/:id',
  authGuard,
  validationMiddleware([
    body('title').optional().isString(),
    body('description').optional().isString(),
  ]),
  asyncHandler(presentationCtrl.updatePresentation)
);

router.delete('/:id', authGuard, asyncHandler(presentationCtrl.deletePresentation));

router.use(errorHandler);

export default router;
