import { ParameterizedContext } from 'koa';
import { BoardModel } from './board.model';
import * as db from './board.memory.repository';
import { newBoardForTask, deleteAllTaskInBoard } from '../tasks/task.memory.repository';

/**
 * Handle GET request to "/boards" route and send set of boards from repository
 * 
 * @param ctx - KOA context object
 * 
 * @returns The promise void
 *
 */
 export async function getAllBoards(ctx: ParameterizedContext): Promise<void> {
  const boards = await db.getAllBoards();
  ctx.body = boards.map(BoardModel.toResponse);
  ctx.status = 200;
}

/**
 * Handle GET request to "/boards/:boardId" route and send Board record with boardId
 * 
 * @param ctx - KOA context object
 * 
 * @returns The promise void
 *
 */
 export async function getBoard(ctx: ParameterizedContext): Promise<void> {
  const { boardId } = ctx['params'];
  const board = await db.getBoard(boardId);
  if (!board) {
    ctx.throw(404, `Board with ID ${boardId} does not exist`);
  } else {
    ctx.body = BoardModel.toResponse(board);
    ctx.status = 200;
  }
}

/**
 * Handle POST request on "/boards" route, create new Board record in repository and send new Board object back
 * 
 * @param ctx - KOA context object
 * 
 * @returns The promise void
 *
 */
 export async function createBoard(ctx: ParameterizedContext): Promise<void> {
  const board = ctx.request.body;
  const check = board.title && board.columns && Array.isArray(board.columns);
  if (!check) {
    ctx.throw(400, 'There are issues with inbound data');
  } else {
    const newBoard = await db.createBoard(board);
    await newBoardForTask(newBoard.id);
    ctx.body = BoardModel.toResponse(newBoard);
    ctx.status = 201;
  }
}

/**
 * Handle PUT request on "/boards/:boardId" route, update Board record with boardId and send updated Board object back
 * 
 * @param ctx - KOA context object
 * 
 * @returns The promise void
 *
 */
 export async function updateBoard(ctx: ParameterizedContext): Promise<void> {
  const { boardId } = ctx['params'];
  const boardData = ctx.request.body;
  const updatedBoard = await db.updateBoard({
    id: boardId,
    ...boardData
  });
  if (!updatedBoard) {
    ctx.throw(404, `Board with ID ${boardId} does not exist`);
  } else {
    ctx.body = BoardModel.toResponse(updatedBoard);
    ctx.status = 200;
  }
}

/**
 * Handle DELETE request on "/boards/:boardId" route, delete Board record with boardId
 * 
 * @param ctx - KOA context object
 * 
 * @returns The promise void
 *
 */
 export async function deleteBoard(ctx: ParameterizedContext): Promise<void> {
  const { boardId } = ctx['params'];
  const deletedBoard = await db.deleteBoard(boardId);
  if (!deletedBoard) {
    ctx.throw(404, `Board with ID ${boardId} does not exist`);
  } else {
    await deleteAllTaskInBoard(boardId);
    ctx.status = 204;
  }
}
