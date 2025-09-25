import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT || '4000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY || '15m',
  JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY || '30d',
  COOKIE_SECURE: process.env.COOKIE_SECURE === 'true',
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
  RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX) || 100,
  SEED_ADMIN_EMAIL: process.env.SEED_ADMIN_EMAIL || 'admin@eshi.org',
  SEED_ADMIN_PASSWORD: process.env.SEED_ADMIN_PASSWORD || 'changeme123',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
};

for (const [key, value] of Object.entries(config)) {
  if (
    (value === undefined || value === '') &&
    !['GOOGLE_ACCESS_TOKEN', 'PORT', 'NODE_ENV'].includes(key)
  ) {
    throw new Error(`Missing required env var: ${key}`);
  }
}
