import Router from 'koa-router';
import { ParameterizedContext } from 'koa';
import { TaskModel } from './task.model';
import { taskService } from "./task.service";
import { sendErrorMessage } from '../shared/utils';

/**
 * Handle GET request to "/boards/:boardId/tasks" route and send set of tasks for board with boardId from repository
 * 
 * @param ctx - KOA context object
 * 
 * @returns The promise void
 *
 */
async function getAllTasks(ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>): Promise<void> {
  const { boardId } = ctx.params;
  const tasks = await taskService.getAllTask(boardId);
  if (!tasks) {
    sendErrorMessage(ctx, `Board with ID ${boardId} does not exist`, 404);
  } else {
    ctx.body = tasks.map(TaskModel.toResponse);
    ctx.status = 200;
  }
}

/**
 * Handle GET request to "/boards/:boardId/tasks/:taskId" route and send Task record with taskId for board with boardId
 * 
 * @param ctx - KOA context object
 * 
 * @returns The promise void
 *
 */
async function getTask(ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>): Promise<void> {
  const { boardId, taskId } = ctx.params;
  const task = await taskService.getTask(boardId, taskId);
  if (!task) {
    sendErrorMessage(ctx, `Task with ID ${taskId} or Board with ID ${boardId} does not exist`, 404);
  } else {
    ctx.body = TaskModel.toResponse(task);
    ctx.status = 200;
  }
}

/**
 * Handle POST request on "/boards/:boardId/tasks" route, create new Task record for board with boardId in repository and send new Task object back
 * 
 * @param ctx - KOA context object
 * 
 * @returns The promise void
 *
 */
async function createTask(ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>): Promise<void> {
  const { boardId } = ctx.params;
  const task = ctx.request.body;
  const check = (task.title !== undefined) && (task.order !== undefined) && (task.description !== undefined) && (task.userId !== undefined);
  if (!check) {
    sendErrorMessage(ctx, 'There are issues with inbound data', 400);
  } else {
    const newTask = await taskService.createTask(boardId, task);
    if (!newTask) {
      sendErrorMessage(ctx, 'There are issues with inbound data', 400);
    } else {
        ctx.body = TaskModel.toResponse(newTask);
        ctx.status = 201;
    }
  }
}

/**
 * Handle PUT request on "/boards/:boardId/tasks/:taskId" route, update Task record with userId for board with boardId and send updated Task object back
 * 
 * @param ctx - KOA context object
 * 
 * @returns The promise void
 *
 */
async function updateTask(ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>): Promise<void> {
  const { boardId, taskId } = ctx.params;
  const userData = ctx.request.body;
  const updatedTask = await taskService.updateTask(boardId, {
    id: taskId,
    ...userData
  });
  if (!updatedTask) {
    sendErrorMessage(ctx, `Task with ID ${taskId} or Board with ID ${boardId} does not exist`, 404);
  } else {
    ctx.body = TaskModel.toResponse(updatedTask);
    ctx.status = 200;
  }
}

/**
 * Handle DELETE request on "/boards/:boardId/tasks/:taskId" route, delete Task record with taskId for board with boardId
 * 
 * @param ctx - KOA context object
 * 
 * @returns The promise void
 *
 */
async function deleteTask(ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>): Promise<void> {
  const { boardId, taskId } = ctx.params;
  const deletedTask = await taskService.deleteTask(boardId, taskId);
  if (!deletedTask) {
    sendErrorMessage(ctx, `Task with ID ${taskId} or Board with ID ${boardId} does not exist`, 404);
  } else {
    ctx.status = 204;
  }
}

export const handlers = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
}