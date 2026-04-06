// src/routes/impact.routes.ts
import express from 'express';
import * as impactCtrl from '../controllers/impact.controller';
import { IdParamDto } from '../dto/common/id-param.dto';
import { CreateImpactDto } from '../dto/impact/create-impact.dto';
import { UpdateImpactDto } from '../dto/impact/update-impact.dto';
import { asyncHandler } from '../middleware/asyncHandler';
import { authGuard } from '../middleware/auth.guard';
import { errorHandler } from '../middleware/errorHandler';
import { singleUpload } from '../middleware/multerMiddleware';
import { validateDto } from '../middleware/validateDto';

const router = express.Router();

router.get('/', asyncHandler(impactCtrl.getImpacts));

router.get('/:id', validateDto(IdParamDto, 'params'), asyncHandler(impactCtrl.getImpact));

router.post(
  '/',
  authGuard,
  singleUpload,
  validateDto(CreateImpactDto),
  asyncHandler(impactCtrl.createImpact)
);

router.put(
  '/:id',
  authGuard,
  singleUpload,
  validateDto(IdParamDto, 'params'),
  validateDto(UpdateImpactDto),
  asyncHandler(impactCtrl.updateImpact)
);

router.delete('/:id', authGuard, validateDto(IdParamDto, 'params'), asyncHandler(impactCtrl.deleteImpact));

router.use(errorHandler);

export default router;
