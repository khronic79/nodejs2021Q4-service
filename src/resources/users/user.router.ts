import Router from 'koa-router';
import { handlers } from './user.handler';

export const router = new Router();

router
  .get('/users', handlers.getAllUsers)
  .get('/users/:userId', handlers.getUser)
  .post('/users', handlers.createUser)
  .put('/users/:userId', handlers.updateUser)
  .delete('/users/:userId', handlers.deleteUser);
