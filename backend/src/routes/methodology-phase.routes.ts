import express from 'express';
import * as methodologyPhaseCtrl from '../controllers/methodology-phase.controller';
import { IdParamDto } from '../dto/common/id-param.dto';
import { CreateMethodologyPhaseDto, UpdateMethodologyPhaseDto } from '../dto/methodology-phase/methodology-phase.dto';
import { asyncHandler } from '../middleware/asyncHandler';
import { authGuard } from '../middleware/auth.guard';
import { errorHandler } from '../middleware/errorHandler';
import { validateDto } from '../middleware/validateDto';

const router = express.Router();

router.get('/', asyncHandler(methodologyPhaseCtrl.getMethodologyPhases));
router.get('/:id', validateDto(IdParamDto, 'params'), asyncHandler(methodologyPhaseCtrl.getMethodologyPhase));
router.post('/', authGuard, validateDto(CreateMethodologyPhaseDto), asyncHandler(methodologyPhaseCtrl.createMethodologyPhase));
router.put('/:id', authGuard, validateDto(IdParamDto, 'params'), validateDto(UpdateMethodologyPhaseDto), asyncHandler(methodologyPhaseCtrl.updateMethodologyPhase));
router.delete('/:id', authGuard, validateDto(IdParamDto, 'params'), asyncHandler(methodologyPhaseCtrl.deleteMethodologyPhase));
router.use(errorHandler);

export default router;
