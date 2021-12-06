import { v4 as uuidv4 } from 'uuid';
import { boardRepo } from './board.memory.repository';
import { columnService } from '../columns/column.service';

type Column = {
  id: string;
  title: string;
  order: number;
};

type Board = {
  id: string;
  title: string;
  columns: Column[];
};

type NewBoard = {
  title: string;
  columns: Column[];
};

type UpdatedBoard = {
  id: string;
  title?: string;
  columns?: Column[];
};

async function getAllBoards(): Promise<Board[]> {
  const boards: Board[] = [];
  boardRepo.forEach((board) => {
    boards.push(board);
  });
  return Promise.resolve(boards);
}

async function getBoard(boardId: string): Promise<Board | null> {
  const board = boardRepo.get(boardId);
  if (!board) return Promise.resolve(null);
  return Promise.resolve(board);
}

async function createBoard(board: NewBoard): Promise<Board | null> {
  const check = board.title && board.columns && Array.isArray(board.columns);
  if (!check) return Promise.resolve(null);
  const columns = columnService.createColumns([], board.columns);
  const id = uuidv4();
  const newRecord = {
    id,
    title: board.title,
    columns,
  }
  boardRepo.set(id, newRecord);
  return Promise.resolve(newRecord);
}

async function updateBoard(board: UpdatedBoard): Promise<Board | null> {
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

async function deleteBoard(boardId: string): Promise<Board | null> {
  const board = boardRepo.get(boardId);
  if (!board) return Promise.resolve(null);
  boardRepo.delete(boardId);
  return Promise.resolve(board);
}

export const boardService = {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
}