import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './lib/config';
import { logger } from './lib/logger';
import { mongoSanitizeMiddleware } from './middleware/mongoSanitize';
import { xssCleanMiddleware } from './middleware/xssClean'; // custom XSS middleware

// after body parsers

const app = express();

// --------------------
// Security Headers
// --------------------
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'res.cloudinary.com'],
      },
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  })
);

app.use(cookieParser());

// --------------------
// CORS
// --------------------
app.use(cors({ origin: config.APP_URL, credentials: true }));

// --------------------
// Body Parsers
// --------------------
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// --------------------
// Logger (Morgan -> Winston)
// --------------------
app.use(
  morgan('combined', {
    stream: { write: (msg) => logger.info(msg.trim()) },
  })
);

// --------------------
// Rate Limiting
// --------------------
const globalLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
  max: config.RATE_LIMIT_MAX || 100,
  message: { error: 'Too many requests, try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', globalLimiter);

// --------------------
// Sanitization
// --------------------
app.use(mongoSanitizeMiddleware); // NoSQL injection protection
app.use(xssCleanMiddleware); // XSS protection

// --------------------
// Example Health Route
// --------------------
app.get('/api/health', (_req, res) => {
  res.json({ status: 'up' });
});

export default app;
