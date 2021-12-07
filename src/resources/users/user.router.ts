import Router from 'koa-router';
import { UserModel } from './user.model';
import { usersService } from './user.service';
import { taskService } from '../tasks/task.service';
import { sendErrorMessage } from '../shared/utils';

export const router = new Router();

router
  .get('/users', async (ctx) => {
    const users = await usersService.getAllUsers();
    ctx.body = users.map(UserModel.toResponse);
    ctx.status = 200;
  })
  .get('/users/:userId', async (ctx) => {
    const { userId } = ctx.params;
    const user = await usersService.getUser(userId);
    if (!user) {
      sendErrorMessage(ctx, `User with ID ${userId} does not exist`, 404);
    } else {
      ctx.body = UserModel.toResponse(user);
      ctx.status = 200;
    }
  })
  .post('/users', async (ctx) => {
    const user = ctx.request.body;
    const check = user.name && user.login && user.password ;
    if (!check) {
      sendErrorMessage(ctx, 'There are issues with inbound data', 400);
    } else {
      const newUser = await usersService.createUser(user);
      ctx.body = UserModel.toResponse(newUser);
      ctx.status = 201;
    }
  })
  .put('/users/:userId', async (ctx) => {
    const { userId } = ctx.params;
    const userData = ctx.request.body;
    const updatedUser = await usersService.updateUser({
      id: userId,
      ...userData
    });
    if (!updatedUser) {
      sendErrorMessage(ctx, `User with ID ${userId} does not exist`, 404);
    } else {
      ctx.body = UserModel.toResponse(updatedUser);
      ctx.status = 200;
    }
  })
  .delete('/users/:userId', async (ctx) => {
    const { userId } = ctx.params;
    const deletedUser = await usersService.deleteUser(userId);
    if (!deletedUser) {
      sendErrorMessage(ctx, `User with ID ${userId} does not exist`, 404);
    } else {
      await taskService.clearUserInTasks(userId);
      ctx.status = 204;
    }
  });
