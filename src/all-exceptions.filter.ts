import { Catch, ArgumentsHost, Logger, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsLoggingFilter extends BaseExceptionFilter {
  private readonly logger = new Logger('');

  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = response.statusText;
    const method = request.method;
    const url = request.url;
    const body = request.body;
    const logObj = {
      request: { method, url, body },
      response: { status },
    };
    this.logger.log(JSON.stringify(logObj));
    if (exception instanceof HttpException) this.logger.warn(exception);
  }
}
