import express from 'express';
import * as aboutCtrl from '../controllers/about.controller';
import { CreateAboutDto } from '../dto/about/create-about.dto';
import { asyncHandler } from '../middleware/asyncHandler';
import { authGuard } from '../middleware/auth.guard';
import { errorHandler } from '../middleware/errorHandler';
import { validateDto } from '../middleware/validateDto';

const router = express.Router();

router.get('/', asyncHandler(aboutCtrl.getAbout));

router.post(
  '/',
  authGuard,
  validateDto(CreateAboutDto),
  asyncHandler(aboutCtrl.createAbout)
);

router.use(errorHandler);

export default router;
