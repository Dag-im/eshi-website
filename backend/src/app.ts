import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './lib/config';
import { logger } from './lib/logger';
import { xssCleanMiddleware } from './middleware/xssClean'; // custom XSS middleware

// after body parsers

const app = express();

// --------------------
// Security Headers
// --------------------
app.use(
  helmet({
    // MIGRATION: allow cross-origin image consumption for uploaded media previews.
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:'],
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
  // Avoid throttling public/read traffic (hero data, uploaded media, etc.).
  // Auth and sensitive routes already have dedicated stricter limiters.
  skip: (req) => ['GET', 'HEAD', 'OPTIONS'].includes(req.method),
});
app.use('/api', globalLimiter);

// --------------------
// Sanitization
// --------------------
app.use(xssCleanMiddleware); // XSS protection

// --------------------
// Example Health Route
// --------------------
app.get('/api/health', (_req, res) => {
  res.json({ status: 'up' });
});

export default app;
