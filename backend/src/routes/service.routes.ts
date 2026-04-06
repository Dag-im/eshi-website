// src/routes/service.routes.ts
import express from 'express';
import * as serviceCtrl from '../controllers/service.controller';
import { IdParamDto } from '../dto/common/id-param.dto';
import { CreateServiceDto } from '../dto/service/create-service.dto';
import { UpdateServiceDto } from '../dto/service/update-service.dto';
import { asyncHandler } from '../middleware/asyncHandler';
import { authGuard } from '../middleware/auth.guard';
import { errorHandler } from '../middleware/errorHandler';
import { validateDto } from '../middleware/validateDto';

const router = express.Router();

router.get('/', asyncHandler(serviceCtrl.getServices));

router.get('/:id', validateDto(IdParamDto, 'params'), asyncHandler(serviceCtrl.getService));

router.post(
  '/',
  authGuard,
  validateDto(CreateServiceDto),
  asyncHandler(serviceCtrl.createService)
);

router.put(
  '/:id',
  authGuard,
  validateDto(IdParamDto, 'params'),
  validateDto(UpdateServiceDto),
  asyncHandler(serviceCtrl.updateService)
);

router.delete('/:id', authGuard, validateDto(IdParamDto, 'params'), asyncHandler(serviceCtrl.deleteService));

router.use(errorHandler);

export default router;
