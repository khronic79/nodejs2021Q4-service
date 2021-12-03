const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const path = require('path');
const YAML = require('yamljs');
const { koaSwagger } = require('koa2-swagger-ui');
const json = require('koa-json');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = new Koa();
const router = new Router();
const spec = YAML.load(path.join(__dirname, '../doc/api.yaml'));

router.use(koaSwagger({ swaggerOptions: { spec } }));

router.get('/doc', koaSwagger({ routePrefix: false, swaggerOptions: { spec } }));

router.get('/', (ctx, next) => {
  ctx.body = 'Service is running!';
  next();
});

app
  .use(bodyParser())
  .use(json())
  .use(router.routes())
  .use(userRouter.routes())
  .use(boardRouter.routes())
  .use(taskRouter.routes());

module.exports = app;
