// src/routes/contact.routes.ts
import express from 'express';
import rateLimit from 'express-rate-limit';
import * as contactCtrl from '../controllers/contact.controller';
import { asyncHandler } from '../middleware/asyncHandler';
import { authGuard } from '../middleware/auth.guard';
import { errorHandler } from '../middleware/errorHandler';
import { validationMiddleware } from '../middleware/validationMiddleware';

const expressValidator: any = require('express-validator');
const { body } = expressValidator;

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { error: { message: 'Too many contact submissions. Please try again later.' } },
});

router.post(
  '/',
  contactLimiter,
  validationMiddleware([
    body('name').isString().withMessage('Name is required.'),
    body('email').isEmail().withMessage('Valid email is required.'),
    body('message').isString().withMessage('Message is required.'),
  ]),
  asyncHandler(contactCtrl.submitContactMessage)
);

router.get('/', authGuard, asyncHandler(contactCtrl.getContactMessages));

router.get('/:id', authGuard, asyncHandler(contactCtrl.getContactMessage));

router.put('/:id/mark-seen', authGuard, asyncHandler(contactCtrl.markContactMessageSeen));

router.use(errorHandler);

export default router;
