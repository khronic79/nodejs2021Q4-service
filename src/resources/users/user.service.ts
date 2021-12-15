import Router from 'koa-router';
import { ParameterizedContext } from 'koa';
import { UserModel } from './user.model';
import * as db  from './user.memory.repository';
import { clearUserInTasks } from '../tasks/task.memory.repository';
import { sendErrorMessage } from '../shared/utils';

/**
 * Handle GET request to "/users" route and send set of users from repository
 * 
 * @param ctx - KOA context object
 * 
 * @returns The promise void
 *
 */
 export async function getAllUsers(ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>): Promise<void> {
  const users = await db.getAllUsers();
  ctx.body = users.map(UserModel.toResponse);
  ctx.status = 200;
}

/**
 * Handle GET request to "/users/:userId" route and send User record with userId
 * 
 * @param ctx - KOA context object
 * 
 * @returns The promise void
 *
 */
 export async function getUser(ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>): Promise<void> {
  const { userId } = ctx.params;
  const user = await db.getUser(userId);
  if (!user) {
    sendErrorMessage(ctx, `User with ID ${userId} does not exist`, 404);
  } else {
    ctx.body = UserModel.toResponse(user);
    ctx.status = 200;
  }
}

/**
 * Handle POST request on "/users" route, create new User record in repository and send new User object back
 * 
 * @param ctx - KOA context object
 * 
 * @returns The promise void
 *
 */
 export async function createUser(ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>): Promise<void> {
  const user = ctx.request.body;
  const check = user.name && user.login && user.password ;
  if (!check) {
    sendErrorMessage(ctx, 'There are issues with inbound data', 400);
  } else {
    const newUser = await db.createUser(user);
    ctx.body = UserModel.toResponse(newUser);
    ctx.status = 201;
  }
}

/**
 * Handle PUT request on "/users/:userId" route, update User record with userId and send updated User object back
 * 
 * @param ctx - KOA context object
 * 
 * @returns The promise void
 *
 */
 export async function updateUser(ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>): Promise<void> {
  const { userId } = ctx.params;
  const userData = ctx.request.body;
  const updatedUser = await db.updateUser({
    id: userId,
    ...userData
  });
  if (!updatedUser) {
    sendErrorMessage(ctx, `User with ID ${userId} does not exist`, 404);
  } else {
    ctx.body = UserModel.toResponse(updatedUser);
    ctx.status = 200;
  }
}

/**
 * Handle DELETE request on "/users/:userId" route, delete User record with userId
 * 
 * @param ctx - KOA context object
 * 
 * @returns The promise void
 *
 */
export async function deleteUser(ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>): Promise<void> {
  const { userId } = ctx.params;
  const deletedUser = await db.deleteUser(userId);
  if (!deletedUser) {
    sendErrorMessage(ctx, `User with ID ${userId} does not exist`, 404);
  } else {
    await clearUserInTasks(userId);
    ctx.status = 204;
  }
}