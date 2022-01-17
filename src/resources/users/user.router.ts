import Router from 'koa-router';
import * as services from './user.service';

export const router = new Router();

router
  .get('/users', services.getAllUsers)
  .get('/users/:userId', services.getUser)
  .post('/users', services.createUser)
  .put('/users/:userId', services.updateUser)
  .delete('/users/:userId', services.deleteUser)
  .post('/login',services.loginUser);
