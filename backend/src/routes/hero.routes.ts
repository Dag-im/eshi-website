// src/routes/hero.routes.ts
import express from 'express';
import * as heroCtrl from '../controllers/hero.controller';
import { asyncHandler } from '../middleware/asyncHandler';
import { authGuard } from '../middleware/auth.guard';
import { errorHandler } from '../middleware/errorHandler';
import { multipleUpload } from '../middleware/multerMiddleware';
import { validationMiddleware } from '../middleware/validationMiddleware';

const expressValidator: any = require('express-validator');
const { body } = expressValidator;

const router = express.Router();

router.get('/', asyncHandler(heroCtrl.getHero));

router.put(
  '/',
  authGuard,
  multipleUpload,
  validationMiddleware([
    body('existing').optional().isJSON().withMessage('Existing must be valid JSON array.'),
    body('alts').optional().isJSON().withMessage('Alts must be valid JSON array.'),
  ]),
  asyncHandler(heroCtrl.updateHero)
);

router.use(errorHandler);

export default router;
