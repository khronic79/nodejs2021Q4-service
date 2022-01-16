import { getRepository } from 'typeorm';
import { BoardModel } from './board.model';
import { Board, NewBoard, UpdatedBoard } from '../types/types';

/**
 * Return all boards from repository
 *
 * @returns The promise with array of all boards in repository
 *
 */
export async function getAllBoards(): Promise<BoardModel[]> {
/*   const boardData = await getRepository(BoardModel)
    .find({
      relations: ['columns'],
    }); */
  const boardData = await getRepository(BoardModel)
    .createQueryBuilder('board')
    .leftJoinAndSelect('board.columns', 'column')
    .orderBy('column.order', 'ASC')
    .getMany();
  return boardData;
}

/**
 * Return board according to board ID
 * 
 * @param boardId - The unique board id in repository
 * 
 * @returns The promise with user's object of Board type or null if board with boardId does not exist
 *
 */
export async function getBoard(boardId: string): Promise<BoardModel | undefined> {
/*   const result = await getRepository(BoardModel)
    .findOne(boardId, {
      relations: ['columns']
    });
  return result; */
  const boardData = await getRepository(BoardModel)
    .createQueryBuilder('board')
    .leftJoinAndSelect('board.columns', 'column')
    .where('board.id = :id', { id: boardId })
    .orderBy('column.order', 'ASC')
    .getOne();
  return boardData;
}

/**
 * Create a new board in repository
 * 
 * @param board - Object of NewUser type with users's data
 * 
 * @returns The promise with created board's object of Board type or null if NewBoard object has not needed data
 *
 */
export async function createBoard(newBoard: NewBoard): Promise<BoardModel> {
  const insertResult = await getRepository(BoardModel)
    .save(newBoard);
  const board = insertResult;
  return board;
}

/**
 * Update an existed board in repository
 * 
 * @param board - Object of UpdateBoard type with board's data
 * 
 * @returns The promise with created board's object or null if NewBoard object has not needed data
 *
 */
export async function updateBoard(newBoard: UpdatedBoard): Promise<BoardModel | undefined> {
  const board = await getRepository(BoardModel).findOne(newBoard.id, {
    relations: ['columns']
  });
  if (!board) return undefined;
  await getRepository(BoardModel)
    .save(newBoard);
  const updatedBoard = await getRepository(BoardModel)
    .createQueryBuilder('board')
    .leftJoinAndSelect('board.columns', 'column')
    .where('board.id = :id', { id: newBoard.id })
    .orderBy('column.order', 'ASC')
    .getOne();
  return updatedBoard;
}

/**
 * Delete board's record in repository and return deleted board according to board ID
 * 
 * @param boardId - The unique board id in repository
 * 
 * @returns The promise with board's object of Board type or null if board with boardId does not exist
 *
 */
export async function deleteBoard(boardId: string): Promise<Board | undefined> {
  const deletedResult = await getRepository(BoardModel)
    .createQueryBuilder()
    .delete()
    .where("id = :id", { id: boardId })
    .returning(['id', 'title', 'columns'])
    .execute();
  const board = deletedResult.raw[0] as Board | undefined;
  return board;
}
