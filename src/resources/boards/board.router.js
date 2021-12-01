const Router = require('koa-router');
const Board = require('./board.model');
const boardService = require('./board.service');
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
  .get('/boards', async (ctx) => {
    const users = await boardService.getAllBoards();
    ctx.body = users.map(Board.toResponse);
    ctx.status = 200;
  })
  .get('/boards/:boardId', async (ctx) => {
    const { boardId } = ctx.params;
    const board = await boardService.getBoard(boardId);
    if (!board) {
      sendErrorMessage(ctx, `Board with ID ${boardId} does not exist`, 404);
    } else {
      ctx.body = Board.toResponse(board);
      ctx.status = 200;
    }
  })
  .post('/boards', async (ctx) => {
    const board = ctx.request.body;
    const newBoard = await boardService.createBoard(board);
    await taskService.newBoard(newBoard.id);
    if (!newBoard) {
      sendErrorMessage(ctx, 'There are issues with inbound data', 400);
    } else {
      ctx.body = Board.toResponse(newBoard);
      ctx.status = 201;
    }
  })
  .put('/boards/:boardId', async (ctx) => {
    const { boardId } = ctx.params;
    const boardData = ctx.request.body;
    const updatedBoard = await boardService.updateBoard({
      id: boardId,
      ...boardData
    });
    if (!updatedBoard) {
      sendErrorMessage(ctx, `Board with ID ${boardId} does not exist`, 404);
    } else {
      ctx.body = Board.toResponse(updatedBoard);
      ctx.status = 200;
    }
  })
  .delete('/boards/:boardId', async (ctx) => {
    const { boardId } = ctx.params;
    const deletedBoard = await boardService.deleteBoard(boardId);
    if (!deletedBoard) {
      sendErrorMessage(ctx, `Board with ID ${boardId} does not exist`, 404);
    } else {
      await taskService.deleteAllTaskInBoard(boardId);
      ctx.status = 204;
    }
  });

module.exports = router;

