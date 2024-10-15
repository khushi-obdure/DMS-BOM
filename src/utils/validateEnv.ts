import { cleanEnv, email, host, num, port, str } from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    DB_HOST: host(),
    DB_PORT: port(),
    DB_USER: str(),
    DB_PASSWORD: str(),
    DB_DATABASE: str(),
    SECRET_KEY: str(),
    LOG_FORMAT: str(),
    LOG_DIR: str(),
    ORIGIN: str(),
    MAIL_HOST: host(),
    MAIL_PORT: port(),
    MAIL_FROM: str(),
    MAIL_USERNAME: str(),
    MAIL_PASSWORD: str(),
    MAIL_SECURE: str(),
    MAIL_BCC: str(),
    AWS_S3_URL: str(),
    AWS_REGION: str(),
    AWS_ACCESS_KEY_ID: str(),
    AWS_SECRET_ACCESS_KEY: str(),
    AWS_BUCKET: str(),
    JWT_ACCESS_EXPIRATION_MINUTES: num()
  });
}

export default validateEnv;
