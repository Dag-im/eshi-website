// src/routes/user.route.ts
import express from 'express';
import * as userCtrl from '../controllers/user.controller';
import { IdParamDto } from '../dto/common/id-param.dto';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { asyncHandler } from '../middleware/asyncHandler';
import { authGuard } from '../middleware/auth.guard';
import { errorHandler } from '../middleware/errorHandler';
import { validateDto } from '../middleware/validateDto';

const router = express.Router();

router.get('/', authGuard, asyncHandler(userCtrl.getUsers));

router.get('/:id', authGuard, validateDto(IdParamDto, 'params'), asyncHandler(userCtrl.getUser));

router.post(
  '/',
  authGuard,
  validateDto(CreateUserDto),
  asyncHandler(userCtrl.createUser)
);

router.put(
  '/:id',
  authGuard,
  validateDto(IdParamDto, 'params'),
  validateDto(UpdateUserDto),
  asyncHandler(userCtrl.updateUser)
);

router.delete('/:id', authGuard, validateDto(IdParamDto, 'params'), asyncHandler(userCtrl.deleteUser));

router.post(
  '/:id/reset-password',
  authGuard,
  validateDto(IdParamDto, 'params'),
  asyncHandler(userCtrl.resetPasswordByAdmin)
);

router.use(errorHandler);

export default router;
