import mongoose from 'mongoose';
import { config } from './config';
import { logger } from './logger';

export async function connectDb() {
  const uri = config.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI not set');
  await mongoose.connect(uri);
  logger.info('MongoDB connected');
}
