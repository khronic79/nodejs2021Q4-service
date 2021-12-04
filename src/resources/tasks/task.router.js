const Router = require('koa-router');
const Task = require('./task.model');
const taskService = require("./task.service");

function sendErrorMessage(ctx, errorMessage, status) {
  ctx.body = {
    errorMessage,
    status
  };
  ctx.status = status;
}

const router = new Router();

router
  .get('/boards/:boardId/tasks', async (ctx) => {
    const { boardId } = ctx.params;
    const tasks = await taskService.getAllTask(boardId);
    if (!tasks) {
      sendErrorMessage(ctx, `Board with ID ${boardId} does not exist`, 404);
    } else {
      ctx.body = tasks.map(Task.toResponse);
      ctx.status = 200;
    }
  })
  .get('/boards/:boardId/tasks/:taskId', async (ctx) => {
    const { boardId, taskId } = ctx.params;
    const task = await taskService.getTask(boardId, taskId);
    if (!task) {
      sendErrorMessage(ctx, `Task with ID ${taskId} or Board with ID ${boardId} does not exist`, 404);
    } else {
      ctx.body = Task.toResponse(task);
      ctx.status = 200;
    }
  })
  .post('/boards/:boardId/tasks', async (ctx) => {
    const { boardId } = ctx.params;
    const task = ctx.request.body;
    const newTask = await taskService.createTask(boardId, task);
    if (!newTask) {
      sendErrorMessage(ctx, 'There are issues with inbound data', 400);
    } else {
      ctx.body = Task.toResponse(newTask);
      ctx.status = 201;
    }
  })
  .put('/boards/:boardId/tasks/:taskId', async (ctx) => {
    const { boardId, taskId } = ctx.params;
    const userData = ctx.request.body;
    const updatedTask = await taskService.updateTask(boardId, {
      id: taskId,
      ...userData
    });
    if (!updatedTask) {
      sendErrorMessage(ctx, `Task with ID ${taskId} or Board with ID ${boardId} does not exist`, 404);
    } else {
      ctx.body = Task.toResponse(updatedTask);
      ctx.status = 200;
    }
  })
  .delete('/boards/:boardId/tasks/:taskId', async (ctx) => {
    const { boardId, taskId } = ctx.params;
    const deletedTask = await taskService.deleteTask(boardId, taskId);
    if (!deletedTask) {
      sendErrorMessage(ctx, `Task with ID ${taskId} or Board with ID ${boardId} does not exist`, 404);
    } else {
      ctx.status = 204;
    }
  })

  module.exports = router;