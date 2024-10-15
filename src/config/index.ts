import { config } from 'dotenv';
// config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
config({ path: `.env.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_FROM,
  MAIL_USERNAME,
  MAIL_PASSWORD,
  MAIL_SECURE,
  MAIL_BCC,
  AWS_S3_URL,
  AWS_REGION,
  JWT_ACCESS_EXPIRATION_MINUTES
  

} = process.env;
