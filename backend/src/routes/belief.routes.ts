import express from 'express';
import * as beliefCtrl from '../controllers/belief.controller';
import { IdParamDto } from '../dto/common/id-param.dto';
import { CreateBeliefDto, UpdateBeliefDto } from '../dto/belief/belief.dto';
import { asyncHandler } from '../middleware/asyncHandler';
import { authGuard } from '../middleware/auth.guard';
import { errorHandler } from '../middleware/errorHandler';
import { validateDto } from '../middleware/validateDto';

const router = express.Router();

router.get('/', asyncHandler(beliefCtrl.getBeliefs));
router.get('/:id', validateDto(IdParamDto, 'params'), asyncHandler(beliefCtrl.getBelief));

router.post(
  '/',
  authGuard,
  validateDto(CreateBeliefDto),
  asyncHandler(beliefCtrl.createBelief)
);

router.put(
  '/:id',
  authGuard,
  validateDto(IdParamDto, 'params'),
  validateDto(UpdateBeliefDto),
  asyncHandler(beliefCtrl.updateBelief)
);

router.delete(
  '/:id',
  authGuard,
  validateDto(IdParamDto, 'params'),
  asyncHandler(beliefCtrl.deleteBelief)
);

router.use(errorHandler);

export default router;
