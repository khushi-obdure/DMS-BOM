import App from '@/app';
import { logger } from '@utils/logger';
import validateEnv from '@utils/validateEnv';
validateEnv();

const app = new App([
  // do not change the sequence
]);

try {
  app.listen();
} catch (error) {
  logger.error('Error in server file: ', error);
}
