import Router from 'koa-router';
import { handlers } from './task.handler';

export const router = new Router();

router
  .get('/boards/:boardId/tasks', handlers.getAllTasks)
  .get('/boards/:boardId/tasks/:taskId', handlers.getTask)
  .post('/boards/:boardId/tasks', handlers.createTask)
  .put('/boards/:boardId/tasks/:taskId', handlers.updateTask)
  .delete('/boards/:boardId/tasks/:taskId', handlers.deleteTask)