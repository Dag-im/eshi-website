// src/routes/blog.routes.ts
import express from 'express';
import * as blogCtrl from '../controllers/blog.controller';
import { asyncHandler } from '../middleware/asyncHandler';
import { authGuard } from '../middleware/auth.guard';
import { errorHandler } from '../middleware/errorHandler';
import { singleUpload } from '../middleware/multerMiddleware';
import { validationMiddleware } from '../middleware/validationMiddleware';

const expressValidator: any = require('express-validator');
const { body, query } = expressValidator;

const router = express.Router();

router.get(
  '/',
  validationMiddleware([
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1 }),
    query('featured').optional().isBoolean(),
    query('category').optional().isString(),
  ]),
  asyncHandler(blogCtrl.getBlogs)
);

router.get('/:slug', asyncHandler(blogCtrl.getBlog));

router.post(
  '/',
  authGuard,
  singleUpload,
  validationMiddleware([
    body('title').isString().withMessage('Title is required.'),
    body('excerpt').isString().withMessage('Excerpt is required.'),
    body('category').isString().withMessage('Category is required.'),
    body('content').isString().withMessage('Content is required.'),
    body('date').optional().isISO8601(),
    body('featured').optional().isBoolean(),
  ]),
  asyncHandler(blogCtrl.createBlog)
);

router.put(
  '/:id',
  authGuard,
  singleUpload,
  validationMiddleware([
    body('title').optional().isString(),
    body('excerpt').optional().isString(),
    body('category').optional().isString(),
    body('content').optional().isString(),
    body('date').optional().isISO8601(),
    body('featured').optional().isBoolean(),
  ]),
  asyncHandler(blogCtrl.updateBlog)
);

router.delete('/:id', authGuard, asyncHandler(blogCtrl.deleteBlog));

router.put(
  '/:id/feature',
  authGuard,
  validationMiddleware([body('featured').isBoolean().withMessage('Featured must be a boolean.')]),
  asyncHandler(blogCtrl.toggleFeatured)
);

router.use(errorHandler);

export default router;
