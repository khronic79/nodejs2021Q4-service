import { boardRepo } from '../db/board.db';
import { createColumns } from '../columns/column.service';
import { Board, NewBoard, UpdatedBoard } from '../types/types';
import { getAll, getRecord, deleteRecord, createRecord } from '../shared/service.shared';

/**
 * Return all boards from repository
 *
 * @returns The promise with array of all boards in repository
 *
 */
export async function getAllBoards(): Promise<Board[]> {
  return getAll(boardRepo);
}

/**
 * Return board according to board ID
 * 
 * @param boardId - The unique board id in repository
 * 
 * @returns The promise with user's object of Board type or null if board with boardId does not exist
 *
 */
export async function getBoard(boardId: string): Promise<Board | null> {
  return getRecord(boardId, boardRepo);
}

/**
 * Create a new board in repository
 * 
 * @param board - Object of NewUser type with users's data
 * 
 * @returns The promise with created board's object of Board type or null if NewBoard object has not needed data
 *
 */
export async function createBoard(board: NewBoard): Promise<Board> {
  const newBoard = {
    ...board
  }
  newBoard.columns = createColumns([], board.columns);
  return createRecord(newBoard, boardRepo);
}

/**
 * Update an existed board in repository
 * 
 * @param board - Object of UpdateBoard type with board's data
 * 
 * @returns The promise with created board's object or null if NewBoard object has not needed data
 *
 */
export async function updateBoard(board: UpdatedBoard): Promise<Board | null> {
  if (!board.id) return Promise.resolve(null);
  const currentBoard = boardRepo.get(board.id);
  if (!currentBoard) return Promise.resolve(null);
  const newRecord = {
      id: board.id,
      title: board.title? board.title: currentBoard.title,
      columns: board.columns? board.columns: currentBoard.columns
  }
  boardRepo.set(board.id, newRecord);
  return Promise.resolve(newRecord);
}

/**
 * Delete board's record in repository and return deleted board according to board ID
 * 
 * @param boardId - The unique board id in repository
 * 
 * @returns The promise with board's object of Board type or null if board with boardId does not exist
 *
 */
export async function deleteBoard(boardId: string): Promise<Board | null> {
  return deleteRecord(boardId, boardRepo);
}
