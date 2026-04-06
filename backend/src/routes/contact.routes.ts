// src/routes/contact.routes.ts
import express from 'express';
import rateLimit from 'express-rate-limit';
import * as contactCtrl from '../controllers/contact.controller';
import { IdParamDto } from '../dto/common/id-param.dto';
import { CreateContactDto } from '../dto/contact/create-contact.dto';
import { asyncHandler } from '../middleware/asyncHandler';
import { authGuard } from '../middleware/auth.guard';
import { errorHandler } from '../middleware/errorHandler';
import { validateDto } from '../middleware/validateDto';

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { error: { message: 'Too many contact submissions. Please try again later.' } },
});

router.post(
  '/',
  contactLimiter,
  validateDto(CreateContactDto),
  asyncHandler(contactCtrl.submitContactMessage)
);

router.get('/', authGuard, asyncHandler(contactCtrl.getContactMessages));

router.get('/:id', authGuard, validateDto(IdParamDto, 'params'), asyncHandler(contactCtrl.getContactMessage));

router.put(
  '/:id/mark-seen',
  authGuard,
  validateDto(IdParamDto, 'params'),
  asyncHandler(contactCtrl.markContactMessageSeen)
);

router.use(errorHandler);

export default router;
