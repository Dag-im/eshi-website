import app from './app';
import { config } from './lib/config';
import { connectDb } from './lib/db';
import { logger } from './lib/logger';
import { initEmailTransporter } from './lib/mailer';
import authRoutes from './routes/auth.routes';
import blogRoutes from './routes/blog.routes';
import contactRoutes from './routes/contact.routes';
import heroRoutes from './routes/hero.routes';
import impactRoutes from './routes/impact.routes';
import presentationRoutes from './routes/presentation.routes';
import serviceRoutes from './routes/service.routes';
import teamRoutes from './routes/team.routes';
import usersRoutes from './routes/users.routes';

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/impact', impactRoutes);
app.use('/api/presentations', presentationRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/team', teamRoutes);

async function startServer() {
  try {
    // Connect to DB
    await connectDb();
    logger.info('Database connected');

    // Initialize and verify email transporter
    await initEmailTransporter();
    logger.info('Email transporter initialized');

    // Start server
    app.listen(Number(config.PORT), '0.0.0.0', () => {
      logger.info(`Server listening on port ${config.PORT}`);
    });
  } catch (err: any) {
    logger.error('Startup failed: ' + err.message);
    process.exit(1); // Exit if DB or Email fails
  }
}

startServer();
