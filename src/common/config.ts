import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

export const conf = {
  PORT: process.env['PORT'],
  NODE_ENV: process.env['NODE_ENV'],
  LOG_LEVEL: process.env['LOG_LEVEL'],
  MONGO_CONNECTION_STRING: process.env['MONGO_CONNECTION_STRING'],
  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
  AUTH_MODE: process.env['AUTH_MODE'] === 'true'
};
