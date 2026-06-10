import express from 'express';
import * as missionStoryCtrl from '../controllers/mission-story.controller';
import { IdParamDto } from '../dto/common/id-param.dto';
import { CreateMissionStoryDto, UpdateMissionStoryDto } from '../dto/mission-story/mission-story.dto';
import { asyncHandler } from '../middleware/asyncHandler';
import { authGuard } from '../middleware/auth.guard';
import { errorHandler } from '../middleware/errorHandler';
import { validateDto } from '../middleware/validateDto';

const router = express.Router();

router.get('/', asyncHandler(missionStoryCtrl.getMissionStories));
router.get('/:id', validateDto(IdParamDto, 'params'), asyncHandler(missionStoryCtrl.getMissionStory));

router.post(
  '/',
  authGuard,
  validateDto(CreateMissionStoryDto),
  asyncHandler(missionStoryCtrl.createMissionStory)
);

router.put(
  '/:id',
  authGuard,
  validateDto(IdParamDto, 'params'),
  validateDto(UpdateMissionStoryDto),
  asyncHandler(missionStoryCtrl.updateMissionStory)
);

router.delete(
  '/:id',
  authGuard,
  validateDto(IdParamDto, 'params'),
  asyncHandler(missionStoryCtrl.deleteMissionStory)
);

router.use(errorHandler);

export default router;
