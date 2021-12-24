import { createLogger, format, transports } from "winston";
import { conf } from '../../common/config';

const logLevel = Number(conf.LOG_LEVEL);

const levels: Record<string, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug : 3,
  all: 4
};

const currentLevels: Record<string, number> = {};

Object.keys(levels).forEach((key) => {
  const level = levels[key] as number;
  if (level <= logLevel) {
    currentLevels[key] = level;
  }
});

export const logger = createLogger({
  levels: currentLevels,
  format: format.combine(
    format.splat(),
    format.prettyPrint(),
  ),
  transports: [
    new transports.Console,
    new transports.File({filename: './logs/logs.log'}),
    new transports.File({
      level: 'error',
      filename: './logs/errors.log'
    }),
  ]
});