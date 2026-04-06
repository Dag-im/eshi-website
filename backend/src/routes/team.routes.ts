// src/routes/team.routes.ts
import express from 'express';
import * as teamCtrl from '../controllers/team.controller';
import { IdParamDto } from '../dto/common/id-param.dto';
import { CreateTeamMemberDto } from '../dto/team/create-team-member.dto';
import { UpdateTeamMemberDto } from '../dto/team/update-team-member.dto';
import { asyncHandler } from '../middleware/asyncHandler';
import { authGuard } from '../middleware/auth.guard';
import { errorHandler } from '../middleware/errorHandler';
import { singleUpload } from '../middleware/multerMiddleware';
import { validateDto } from '../middleware/validateDto';

const router = express.Router();

router.get('/', asyncHandler(teamCtrl.getTeamMembers));

router.get('/:id', validateDto(IdParamDto, 'params'), asyncHandler(teamCtrl.getTeamMember));

router.post(
  '/',
  authGuard,
  singleUpload,
  validateDto(CreateTeamMemberDto),
  asyncHandler(teamCtrl.createTeamMember)
);

router.put(
  '/:id',
  authGuard,
  singleUpload,
  validateDto(IdParamDto, 'params'),
  validateDto(UpdateTeamMemberDto),
  asyncHandler(teamCtrl.updateTeamMember)
);

router.delete('/:id', authGuard, validateDto(IdParamDto, 'params'), asyncHandler(teamCtrl.deleteTeamMember));

router.use(errorHandler);

export default router;
