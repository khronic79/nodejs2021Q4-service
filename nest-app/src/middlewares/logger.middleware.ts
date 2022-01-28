import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      'Request...',
      req.path,
      '...',
      req.originalUrl,
      '...',
      req.baseUrl,
    );
    res.on('finish', () => {
      console.log('Response...', res.statusCode);
    });
    next();
  }
}
