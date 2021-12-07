// перепесать логику сервиса для добавления нового борда так, чтобы все сервисы таска ушли из роутора в сервис борда
import Router from 'koa-router';
import { BoardModel } from './board.model';
import { boardService } from './board.service';
import { taskService } from '../tasks/task.service';
import { sendErrorMessage } from '../shared/utils';

export const router = new Router();

router
  .get('/boards', async (ctx) => {
    const users = await boardService.getAllBoards();
    ctx.body = users.map(BoardModel.toResponse);
    ctx.status = 200;
  })
  .get('/boards/:boardId', async (ctx) => {
    const { boardId } = ctx.params;
    const board = await boardService.getBoard(boardId);
    if (!board) {
      sendErrorMessage(ctx, `Board with ID ${boardId} does not exist`, 404);
    } else {
      ctx.body = BoardModel.toResponse(board);
      ctx.status = 200;
    }
  })
  .post('/boards', async (ctx) => {
    const board = ctx.request.body;
    const check = board.title && board.columns && Array.isArray(board.columns);
    if (!check) {
      sendErrorMessage(ctx, 'There are issues with inbound data', 400);
    } else {
      const newBoard = await boardService.createBoard(board);
      await taskService.newBoard(newBoard.id);
      ctx.body = BoardModel.toResponse(newBoard);
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
      ctx.body = BoardModel.toResponse(updatedBoard);
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

