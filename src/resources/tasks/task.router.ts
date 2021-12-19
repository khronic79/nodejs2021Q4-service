import Router from 'koa-router';
import * as services from './task.service';

export const router = new Router();

router
  .get('/boards/:boardId/tasks', services.getAllTasks)
  .get('/boards/:boardId/tasks/:taskId', services.getTask)
  .post('/boards/:boardId/tasks', services.createTask)
  .put('/boards/:boardId/tasks/:taskId', services.updateTask)
  .delete('/boards/:boardId/tasks/:taskId', services.deleteTask)