import { createLogger, format, transports } from "winston";
import { conf } from '../../common/config';

const silent = conf.LOGGER_SILENT;

let logLevel: string;
if (!conf.LOG_LEVEL) {
  logLevel = '4';
} else {
  logLevel = conf.LOG_LEVEL;
}

const levels: Record<string, number> = {
  'fatal': 0,
  'error': 1,
  'warn': 2,
  'info': 3,
  'debug': 4,
  'all': 5
};

const levelsReverse: Record<string, string> = {
  '0': 'fatal',
  '1': 'error',
  '2': 'warn',
  '3': 'info',
  '4': 'debug',
  '5': 'all'
};

let level: string;
const check = levelsReverse[logLevel];
if (!check) {
  level = 'all';
} else {
  level = check;
}

export const logger = createLogger({
  levels,
  format: format.combine(
    format.splat(),
    format.timestamp(),
    format.prettyPrint(),
  ),
  silent: silent === '1',
  transports: [
    new transports.Console({
      level
    }),
    new transports.File({
      level,
      filename: './logs/logs.log'
    }),
    new transports.File({
      level: 'warn',
      filename: './logs/errors.log',
    }),
  ],
});