import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import path from 'path';
import YAML from 'yamljs';
import { koaSwagger } from 'koa2-swagger-ui';
import json from 'koa-json';
import { createLogger, format, transports } from 'winston';
import { router as userRouter } from './resources/users/user.router';
import { router as boardRouter } from './resources/boards/board.router';
import { router as taskRouter } from './resources/tasks/task.router';

export const app = new Koa();
const router = new Router();
const spec = YAML.load(path.join(__dirname, '../doc/api.yaml'));

router.use(koaSwagger({ swaggerOptions: { spec } }));

router.get('/doc', koaSwagger({ routePrefix: false, swaggerOptions: { spec } }));

router.get('/', (ctx, next) => {
  ctx.body = 'Service is running!';
  next();
});

app
  .use(async (ctx, next) => {
    await next();
    const logger = createLogger({
      format: format.combine(
        format.splat(),
        format.simple(),
        format.timestamp(),
        format.prettyPrint(),
      ),
      transports: [new transports.Console()]
    });
    logger.log('error', 'test message %s', ctx.body);
  })
  .use(bodyParser())
  .use(json())
  .use(router.routes())
  .use(userRouter.routes())
  .use(boardRouter.routes())
  .use(taskRouter.routes());

