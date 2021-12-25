import { Next, ParameterizedContext } from "koa";
import { logger } from "./logger";

export async function httpLogger(ctx: ParameterizedContext, next: Next): Promise<void> {
  await next();
  const request = {
    'url': ctx.url,
    'query parameters': ctx.querystring,
    'request body': ctx.request.body
  };
  const response = {
    'status code': ctx.status
  };
  const log = {
    logType: 'User request',
    logData: {
      request,
      response
    }
  }
  let level = 'info';
  if (ctx.status === 404) level = 'warn';
  logger.log({
    level,
    message: JSON.stringify(log)
  });
}