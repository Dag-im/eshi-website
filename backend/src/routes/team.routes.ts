// src/routes/team.routes.ts
import express from 'express';
import * as teamCtrl from '../controllers/team.controller';
import { asyncHandler } from '../middleware/asyncHandler';
import { authGuard } from '../middleware/auth.guard';
import { errorHandler } from '../middleware/errorHandler';
import { singleUpload } from '../middleware/multerMiddleware';
import { validationMiddleware } from '../middleware/validationMiddleware';

const expressValidator: any = require('express-validator');
const { body } = expressValidator;

const router = express.Router();

router.get('/', asyncHandler(teamCtrl.getTeamMembers));

router.get('/:id', asyncHandler(teamCtrl.getTeamMember));

router.post(
  '/',
  authGuard,
  singleUpload,
  validationMiddleware([
    body('name').isString().withMessage('Name is required.'),
    body('title').isString().withMessage('Title is required.'),
    body('bio').isString().withMessage('Bio is required.'),
  ]),
  asyncHandler(teamCtrl.createTeamMember)
);

router.put(
  '/:id',
  authGuard,
  singleUpload,
  validationMiddleware([
    body('name').optional().isString(),
    body('title').optional().isString(),
    body('bio').optional().isString(),
  ]),
  asyncHandler(teamCtrl.updateTeamMember)
);

router.delete('/:id', authGuard, asyncHandler(teamCtrl.deleteTeamMember));

router.use(errorHandler);

export default router;
