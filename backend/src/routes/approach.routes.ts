import express from 'express';
import * as approachCtrl from '../controllers/approach.controller';
import { CreateApproachDto, UpdateApproachDto } from '../dto/approach/approach.dto';
import { IdParamDto } from '../dto/common/id-param.dto';
import { asyncHandler } from '../middleware/asyncHandler';
import { authGuard } from '../middleware/auth.guard';
import { errorHandler } from '../middleware/errorHandler';
import { validateDto } from '../middleware/validateDto';

const router = express.Router();

router.get('/', asyncHandler(approachCtrl.getApproaches));
router.get('/:id', validateDto(IdParamDto, 'params'), asyncHandler(approachCtrl.getApproach));
router.post('/', authGuard, validateDto(CreateApproachDto), asyncHandler(approachCtrl.createApproach));
router.put('/:id', authGuard, validateDto(IdParamDto, 'params'), validateDto(UpdateApproachDto), asyncHandler(approachCtrl.updateApproach));
router.delete('/:id', authGuard, validateDto(IdParamDto, 'params'), asyncHandler(approachCtrl.deleteApproach));
router.use(errorHandler);

export default router;
