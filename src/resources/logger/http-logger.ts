import { Next, ParameterizedContext } from "koa";
import { logger } from "./logger";

export async function httpLogger(ctx: ParameterizedContext, next: Next): Promise<void> {
  logger.log({ // Example for gebug logging level
    level: 'debug',
    message: 'Just gebug example'
  });
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
  logger.log({
    level: 'info',
    message: JSON.stringify(log)
  });
  if (ctx.status === 404) {
    logger.log({
      level: 'warn',
      message: 'User use not right route'
    })
  }
}