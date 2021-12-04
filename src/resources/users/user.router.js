const Router = require('koa-router');
const User = require('./user.model');
const usersService = require('./user.service');
const taskService = require('../tasks/task.service');

function sendErrorMessage(ctx, errorMessage, status) {
  ctx.body = {
    errorMessage,
    status
  };
  ctx.status = status;
}

const router = new Router();

router
  .get('/users', async (ctx) => {
    const users = await usersService.getAllUsers();
    ctx.body = users.map(User.toResponse);
    ctx.status = 200;
  })
  .get('/users/:userId', async (ctx) => {
    const { userId } = ctx.params;
    const user = await usersService.getUser(userId);
    if (!user) {
      sendErrorMessage(ctx, `User with ID ${userId} does not exist`, 404);
    } else {
      ctx.body = User.toResponse(user);
      ctx.status = 200;
    }
  })
  .post('/users', async (ctx) => {
    const user = ctx.request.body;
    const newUser = await usersService.createUser(user);
    if (!newUser) {
      sendErrorMessage(ctx, 'There are issues with inbound data', 400);
    } else {
      ctx.body = User.toResponse(newUser);
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
      ctx.body = User.toResponse(updatedUser);
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
  })

module.exports = router;
