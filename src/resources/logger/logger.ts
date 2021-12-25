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
  'error': 0,
  'warn': 1,
  'info': 2,
  'debug': 3,
  'all': 4
};

const levelsReverse: Record<string, string> = {
  '0': 'error',
  '1': 'warn',
  '2': 'info',
  '3': 'debug',
  '4': 'all'
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
      filename: './logs/errors.log'
    }),
  ]
});