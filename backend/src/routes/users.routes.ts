// src/routes/user.route.ts
import express from 'express';
import * as userCtrl from '../controllers/user.controller';
import { asyncHandler } from '../middleware/asyncHandler';
import { authGuard } from '../middleware/auth.guard';
import { errorHandler } from '../middleware/errorHandler';
import { validationMiddleware } from '../middleware/validationMiddleware';

// Use require + any for express-validator to avoid module format typing issues
const expressValidator: any = require('express-validator');
const { body } = expressValidator;

const router = express.Router();

router.get('/', authGuard, asyncHandler(userCtrl.getUsers));

router.get('/:id', authGuard, asyncHandler(userCtrl.getUser));

router.post(
  '/',
  authGuard,
  validationMiddleware([
    body('name').isString().withMessage('Name is required.'),
    body('email').isEmail().withMessage('Valid email is required.'),
  ]),
  asyncHandler(userCtrl.createUser)
);

router.put(
  '/:id',
  authGuard,
  validationMiddleware([
    body('name').optional().isString().withMessage('Name must be a string.'),
    body('isActive').optional().isBoolean().withMessage('isActive must be a boolean.'),
  ]),
  asyncHandler(userCtrl.updateUser)
);

router.delete('/:id', authGuard, asyncHandler(userCtrl.deleteUser));

router.use(errorHandler);

export default router;
