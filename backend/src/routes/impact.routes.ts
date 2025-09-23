// src/routes/impact.routes.ts
import express from 'express';
import * as impactCtrl from '../controllers/impact.controller';
import { asyncHandler } from '../middleware/asyncHandler';
import { authGuard } from '../middleware/auth.guard';
import { errorHandler } from '../middleware/errorHandler';
import { singleUpload } from '../middleware/multerMiddleware';
import { validationMiddleware } from '../middleware/validationMiddleware';

const expressValidator: any = require('express-validator');
const { body } = expressValidator;

const router = express.Router();

router.get('/', asyncHandler(impactCtrl.getImpacts));

router.get('/:id', asyncHandler(impactCtrl.getImpact));

router.post(
  '/',
  authGuard,
  singleUpload,
  validationMiddleware([
    body('name').isString().withMessage('Name is required.'),
    body('desc').isString().withMessage('Description is required.'),
    body('stat').isString().withMessage('Stat is required.'),
  ]),
  asyncHandler(impactCtrl.createImpact)
);

router.put(
  '/:id',
  authGuard,
  singleUpload,
  validationMiddleware([
    body('name').optional().isString(),
    body('desc').optional().isString(),
    body('stat').optional().isString(),
  ]),
  asyncHandler(impactCtrl.updateImpact)
);

router.delete('/:id', authGuard, asyncHandler(impactCtrl.deleteImpact));

router.use(errorHandler);

export default router;
