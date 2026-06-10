import express from 'express';
import { IdParamDto } from '../dto/common/id-param.dto';
import { CreateServiceCardDto, UpdateServiceCardDto } from '../dto/service-card/service-card.dto';
import * as serviceCardCtrl from '../controllers/service-card.controller';
import { asyncHandler } from '../middleware/asyncHandler';
import { authGuard } from '../middleware/auth.guard';
import { errorHandler } from '../middleware/errorHandler';
import { validateDto } from '../middleware/validateDto';

const router = express.Router();

router.get('/', asyncHandler(serviceCardCtrl.getServiceCards));
router.get('/:id', validateDto(IdParamDto, 'params'), asyncHandler(serviceCardCtrl.getServiceCard));
router.post('/', authGuard, validateDto(CreateServiceCardDto), asyncHandler(serviceCardCtrl.createServiceCard));
router.put('/:id', authGuard, validateDto(IdParamDto, 'params'), validateDto(UpdateServiceCardDto), asyncHandler(serviceCardCtrl.updateServiceCard));
router.delete('/:id', authGuard, validateDto(IdParamDto, 'params'), asyncHandler(serviceCardCtrl.deleteServiceCard));
router.use(errorHandler);

export default router;
