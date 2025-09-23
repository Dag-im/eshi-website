// src/routes/auth.route.ts
import express from 'express';
import rateLimit from 'express-rate-limit';

// Use require + any cast for packages that are causing ES/CommonJS typing trouble
const expressValidator: any = require('express-validator');
const cookieParser: any = require('cookie-parser');

import * as authCtrl from '../controllers/auth.controller';
import { authenticate } from '../lib/jwt';
import { asyncHandler } from '../middleware/asyncHandler';
import { errorHandler } from '../middleware/errorHandler';
import { validationMiddleware } from '../middleware/validationMiddleware';

const { body } = expressValidator;
const router = express.Router();
router.use(cookieParser());

// per-route limiter for sensitive endpoints
const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 6,
  message: { error: { message: 'Too many attempts. Please try again in a minute.' } },
});

const resetLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  message: { error: { message: 'Too many reset requests. Please try again in a minute.' } },
});

router.get('/profile', authenticate, asyncHandler(authCtrl.getProfile));

router.post(
  '/login',
  authLimiter,
  validationMiddleware([
    body('email').isEmail().withMessage('Please provide a valid email address.'),
    body('password').exists().withMessage('Password is required.'),
  ]),
  asyncHandler(authCtrl.login)
);

router.post('/refresh', asyncHandler(authCtrl.refresh));

router.post('/logout', asyncHandler(authCtrl.logout));

router.post(
  '/forgot-password',
  resetLimiter,
  validationMiddleware([
    body('email').isEmail().withMessage('Please provide a valid email address.'),
  ]),
  asyncHandler(authCtrl.forgotPassword)
);

router.post(
  '/reset-password',
  validationMiddleware([
    body('email').isEmail().withMessage('Please provide a valid email address.'),
    body('token').exists().withMessage('Reset token is required.'),
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage('New password must be at least 8 characters long.'),
  ]),
  asyncHandler(authCtrl.resetPassword)
);

router.use(errorHandler);

export default router;
