import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModuleOptions,
} from 'nest-winston';
import * as winston from 'winston';

@Injectable()
export class WinstonConfigService {
  constructor(private configService: ConfigService) {}

  createWinstonModuleOptions(): WinstonModuleOptions {
    const LOGGER_SILENT = this.configService.get('LOGGER_SILENT');
    const LOG_LEVEL = this.configService.get('LOG_LEVEL');

    let logLevel: string;
    if (!LOG_LEVEL) {
      logLevel = '4';
    } else {
      logLevel = LOG_LEVEL;
    }

    const levels: Record<string, number> = {
      fatal: 0,
      error: 1,
      warn: 2,
      info: 3,
      debug: 4,
      all: 5,
    };

    const levelsReverse: Record<string, string> = {
      '0': 'fatal',
      '1': 'error',
      '2': 'warn',
      '3': 'info',
      '4': 'debug',
      '5': 'all',
    };

    let level: string;
    const check = levelsReverse[logLevel];
    if (!check) {
      level = 'all';
    } else {
      level = check;
    }

    return {
      levels,
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.timestamp(),
        winston.format.prettyPrint(),
      ),
      silent: LOGGER_SILENT === '1',
      transports: [
        new winston.transports.Console({
          level,
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              prettyPrint: true,
            }),
          ),
        }),
        new winston.transports.File({
          level,
          filename: './logs/logs.log',
        }),
        new winston.transports.File({
          level: 'warn',
          filename: './logs/errors.log',
          handleExceptions: true,
          handleRejections: true,
        }),
      ],
    };
  }
}
