import { boardRepo } from '../db/board.db';
import { columnService } from '../columns/column.service';
import { Board, NewBoard, UpdatedBoard } from '../types/types';
import { getAll, getRecord, deleteRecord, createRecord } from '../shared/service.shared';

export async function getAllBoards(): Promise<Board[]> {
  return getAll(boardRepo);
}

export async function getBoard(boardId: string): Promise<Board | null> {
  return getRecord(boardId, boardRepo);
}

export async function createBoard(board: NewBoard): Promise<Board> {
  const newBoard = {
    ...board
  }
  newBoard.columns = columnService.createColumns([], board.columns);
  return createRecord(newBoard, boardRepo);
}

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

export async function deleteBoard(boardId: string): Promise<Board | null> {
  return deleteRecord(boardId, boardRepo);
}
