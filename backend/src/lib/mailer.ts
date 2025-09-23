// src/lib/email.service.ts
import nodemailer, { Transporter } from 'nodemailer';
import { config } from './config';
import { logger } from './logger';

let transporter: Transporter | null = null;

/**
 * Initialize the email transporter and verify connection.
 */
export async function initEmailTransporter() {
  transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: Number(config.SMTP_PORT),
    secure: config.SMTP_SECURE,
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
  });

  try {
    await transporter.verify();
    logger.info('Email transporter connected successfully');
  } catch (error: any) {
    logger.error('Failed to connect email transporter:', error.message);
    throw new Error('Email transporter connection failed');
  }
}

/**
 * Send an email, verifying transporter before sending.
 */
export async function sendMail(to: string, subject: string, html: string) {
  if (!transporter) {
    throw new Error('Email transporter not initialized. Call initEmailTransporter() first.');
  }

  try {
    // Optional: verify connection before each send
    await transporter.verify();

    await transporter.sendMail({
      from: `"Eshi App" <${config.SMTP_SENDER}>`,
      to,
      subject,
      html,
    });

    logger.info(`Email sent to ${to} (${subject})`);
  } catch (error: any) {
    logger.error(`Failed to send email to ${to}: ${error.message}`);
    throw new Error('Failed to send email');
  }
}
