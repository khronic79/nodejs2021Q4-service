import { ParameterizedContext } from 'koa';
import { TaskModel } from './task.model';
import * as db from "./task.memory.repository";

/**
 * Handle GET request to "/boards/:boardId/tasks" route and send set of tasks for board with boardId from repository
 * 
 * @param ctx - KOA context object
 * 
 * @returns The promise void
 *
 */
 export async function getAllTasks(ctx: ParameterizedContext): Promise<void> {
  const { boardId } = ctx['params'];
  const tasks = await db.getAllTask(boardId);
  if (!tasks) {
    ctx.throw(404, `Board with ID ${boardId} does not exist`);
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
 export async function getTask(ctx: ParameterizedContext): Promise<void> {
  const { boardId, taskId } = ctx['params'];
  const task = await db.getTask(boardId, taskId);
  if (!task) {
    ctx.throw(404, `Task with ID ${taskId} or Board with ID ${boardId} does not exist`);
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
 export async function createTask(ctx: ParameterizedContext): Promise<void> {
  const { boardId } = ctx['params'];
  const task = ctx.request.body;
  const check = (task.title !== undefined) && (task.order !== undefined) && (task.description !== undefined) && (task.userId !== undefined);
  if (!check) {
    ctx.throw(400, 'There are issues with inbound data');
  } else {
    const newTask = await db.createTask(boardId, task);
    if (!newTask) {
      ctx.throw(400, 'There are issues with inbound data');
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
 export async function updateTask(ctx: ParameterizedContext): Promise<void> {
  const { boardId, taskId } = ctx['params'];
  const userData = ctx.request.body;
  const updatedTask = await db.updateTask(boardId, {
    id: taskId,
    ...userData
  });
  if (!updatedTask) {
    ctx.throw(404, `Task with ID ${taskId} or Board with ID ${boardId} does not exist`);
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
export async function deleteTask(ctx: ParameterizedContext): Promise<void> {
  const { boardId, taskId } = ctx['params'];
  const deletedTask = await db.deleteTask(boardId, taskId);
  if (!deletedTask) {
    ctx.throw(404, `Task with ID ${taskId} or Board with ID ${boardId} does not exist`);
  } else {
    ctx.status = 204;
  }
}