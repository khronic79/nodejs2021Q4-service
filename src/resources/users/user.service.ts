import { ParameterizedContext } from 'koa';
import bcrypt from 'bcrypt';
import { UserModel } from './user.model';
import * as db  from './user.memory.repository';

/**
 * Handle GET request to "/users" route and send set of users from repository
 * 
 * @param ctx - KOA context object
 * 
 * @returns The promise void
 *
 */
 export async function getAllUsers(ctx: ParameterizedContext): Promise<void> {
  const users = await db.getAllUsers();
  ctx.body = users;
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
 export async function getUser(ctx: ParameterizedContext): Promise<void> {
  const { userId } = ctx['params'];
  const user = await db.getUser(userId);
  if (!user) {
    ctx.throw(404, `User with ID ${userId} does not exist`);
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
 export async function createUser(ctx: ParameterizedContext): Promise<void> {
  const user = ctx.request.body;
  const check = user.name && user.login && user.password;
  if (!check) {
    ctx.throw(404, 'There are issues with inbound data');
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
 export async function updateUser(ctx: ParameterizedContext): Promise<void> {
  const { userId } = ctx['params'];
  const userData = ctx.request.body;
  const updatedUser = await db.updateUser({
    id: userId,
    ...userData
  });
  if (!updatedUser) {
    ctx.throw(404, `User with ID ${userId} does not exist`);
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
export async function deleteUser(ctx: ParameterizedContext): Promise<void> {
  const { userId } = ctx['params'];
  const deletedUser = await db.deleteUser(userId);
  if (!deletedUser) {
    ctx.throw(404, `User with ID ${userId} does not exist`);
  } else {
    ctx.status = 204;
  }
}

export async function createAdminRecord(): Promise<void> {
  const result = await db.getUserByLogin('admin');
  if (!result) {
    const admin = {
      login: 'admin',
      password: 'admin',
      name: 'admin'
    };
    await db.createUser(admin);
  }
}

export async function loginUser(ctx: ParameterizedContext): Promise<void> {
  const aData = ctx.request.body;
  const check = aData.login && aData.password;
  if (!check) ctx.throw(404, 'There are issues with inbound data');
  const user = await db.getUserByLogin(aData.login);
  if (!user) ctx.throw(403, 'There is no user with this login or password');
  const checkHash = await bcrypt.compare(aData.password, user.password);
  if (!checkHash) ctx.throw(403, 'There is no user with this login or password');

  ctx.body = 'everything is ok!';
  ctx.status = 200;
}