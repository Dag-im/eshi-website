// src/routes/presentation.routes.ts
import express from 'express';
import * as presentationCtrl from '../controllers/presentation.controller';
import { CreatePresentationDto } from '../dto/presentation/create-presentation.dto';
import { UpdatePresentationDto } from '../dto/presentation/update-presentation.dto';
import { asyncHandler } from '../middleware/asyncHandler';
import { authGuard } from '../middleware/auth.guard';
import { errorHandler } from '../middleware/errorHandler';
import { singleUpload } from '../middleware/multerMiddleware';
import { validateDto } from '../middleware/validateDto';
import { IdParamDto } from '../dto/common/id-param.dto';

const router = express.Router();

router.get('/', asyncHandler(presentationCtrl.getPresentations));

router.get('/:id', validateDto(IdParamDto, 'params'), asyncHandler(presentationCtrl.getPresentation));

router.post(
  '/',
  authGuard,
  singleUpload,
  validateDto(CreatePresentationDto),
  asyncHandler(presentationCtrl.createPresentation)
);

router.put(
  '/:id',
  authGuard,
  singleUpload,
  validateDto(IdParamDto, 'params'),
  validateDto(UpdatePresentationDto),
  asyncHandler(presentationCtrl.updatePresentation)
);

router.delete(
  '/:id',
  authGuard,
  validateDto(IdParamDto, 'params'),
  asyncHandler(presentationCtrl.deletePresentation)
);

router.use(errorHandler);

export default router;
