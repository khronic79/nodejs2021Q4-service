import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
// import path from 'path';
// import YAML from 'yamljs';
// import { koaSwagger } from 'koa2-swagger-ui';
import json from 'koa-json';
import { httpLogger } from './resources/logger/http-logger';
import { router as userRouter } from './resources/users/user.router';
import { router as boardRouter } from './resources/boards/board.router';
import { router as taskRouter } from './resources/tasks/task.router';
import { errorLogger } from './resources/logger/error-logger';

export const app = new Koa();
const router = new Router();
// const spec = YAML.load(path.join(__dirname, '../doc/api.yaml'));

// router.use(koaSwagger({ swaggerOptions: { spec } }));

// router.get('/doc', koaSwagger({ routePrefix: false, swaggerOptions: { spec } }));

router.get('/', (ctx, next) => {
  ctx.body = 'Service is running!';
  next();
});

app.on('error', errorLogger); // logging errors

app
  .use(httpLogger) // logging http request/response status
  .use(bodyParser({
    onerror (...arg) {
      const ctx = arg[1];
      ctx.throw(422, 'JSON is not valid');
    }
  }))
  .use(json())
  .use(router.routes())
  .use(userRouter.routes())
  .use(boardRouter.routes())
  .use(taskRouter.routes());
