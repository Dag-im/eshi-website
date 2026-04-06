import express from 'express';
import { serveUpload } from '../controllers/upload.controller';
import { asyncHandler } from '../middleware/asyncHandler';

const router = express.Router();

router.get('/:filename', asyncHandler(serveUpload));

export default router;
