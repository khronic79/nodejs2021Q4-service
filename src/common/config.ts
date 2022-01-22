import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

export const conf = {
  PORT: process.env['PORT'],
  NODE_ENV: process.env['NODE_ENV'],
  LOG_LEVEL: process.env['LOG_LEVEL'],
  LOGGER_SILENT: process.env['LOGGER_SILENT'],
  POSTGRES_PORT: process.env['POSTGRES_PORT']? process.env['POSTGRES_PORT']: '5432',
  POSTGRES_USER: process.env['POSTGRES_USER'],
  POSTGRES_PASSWORD: process.env['POSTGRES_PASSWORD'],
  POSTGRES_DB: process.env['POSTGRES_DB'],
  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
  AUTH_MODE: process.env['AUTH_MODE'] === 'true'
};
