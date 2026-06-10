import express from 'express';
import * as heroContentCtrl from '../controllers/hero-content.controller';
import { IdParamDto } from '../dto/common/id-param.dto';
import { CreateHeroContentDto } from '../dto/hero-content/create-hero.dto';
import { UpdateHeroContentDto } from '../dto/hero-content/update-hero.dto';
import { asyncHandler } from '../middleware/asyncHandler';
import { authGuard } from '../middleware/auth.guard';
import { errorHandler } from '../middleware/errorHandler';
import { validateDto } from '../middleware/validateDto';

const router = express.Router();

router.get('/', asyncHandler(heroContentCtrl.getHeroContents));
router.get('/:id', validateDto(IdParamDto, 'params'), asyncHandler(heroContentCtrl.getHeroContent));

router.post(
  '/',
  authGuard,
  validateDto(CreateHeroContentDto),
  asyncHandler(heroContentCtrl.createHeroContent)
);

router.put(
  '/:id',
  authGuard,
  validateDto(IdParamDto, 'params'),
  validateDto(UpdateHeroContentDto),
  asyncHandler(heroContentCtrl.updateHeroContent)
);

router.delete(
  '/:id',
  authGuard,
  validateDto(IdParamDto, 'params'),
  asyncHandler(heroContentCtrl.deleteHeroContent)
);

router.use(errorHandler);

export default router;
