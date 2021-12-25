import { ParameterizedContext } from 'koa';
import { logger } from "./logger";

export function errorLogger(err: {status: number} & Error, ctx: ParameterizedContext) {
  const request = {
      'url': ctx.url,
      'query parameters': ctx.querystring,
      'request body': ctx.request.body ? ctx.request.body: 'There is not body in request or it can not be read'
  };
  const response = {
      'status code': err.status? err.status: 'There are not response'
  };
  const log = {
      logType: 'User request',
      logData: {
      request,
      response
      }
  }
  logger.log({
      level: 'info',
      message: JSON.stringify(log)
  });
  let level = 'error';
  if (err.status === 404) level = 'warn';
  logger.log({
      level,
      message: err.toString() + (err.stack? err.stack.toString(): '')
  })
}