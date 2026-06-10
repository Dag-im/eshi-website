import express from 'express';
import { IdParamDto } from '../dto/common/id-param.dto';
import { CreateWhyChooseReasonDto, UpdateWhyChooseReasonDto } from '../dto/why-choose-reason/why-choose-reason.dto';
import * as whyChooseReasonCtrl from '../controllers/why-choose-reason.controller';
import { asyncHandler } from '../middleware/asyncHandler';
import { authGuard } from '../middleware/auth.guard';
import { errorHandler } from '../middleware/errorHandler';
import { validateDto } from '../middleware/validateDto';

const router = express.Router();

router.get('/', asyncHandler(whyChooseReasonCtrl.getWhyChooseReasons));
router.get('/:id', validateDto(IdParamDto, 'params'), asyncHandler(whyChooseReasonCtrl.getWhyChooseReason));
router.post('/', authGuard, validateDto(CreateWhyChooseReasonDto), asyncHandler(whyChooseReasonCtrl.createWhyChooseReason));
router.put('/:id', authGuard, validateDto(IdParamDto, 'params'), validateDto(UpdateWhyChooseReasonDto), asyncHandler(whyChooseReasonCtrl.updateWhyChooseReason));
router.delete('/:id', authGuard, validateDto(IdParamDto, 'params'), asyncHandler(whyChooseReasonCtrl.deleteWhyChooseReason));
router.use(errorHandler);

export default router;
