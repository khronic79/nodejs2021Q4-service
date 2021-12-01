const { v4: uuidv4 } = require('uuid');
const boardRepo = require('./board.memory.repository');

async function getAllBoards() {
  const boards = [];
  boardRepo.forEach((board) => {
    boards.push(board);
  });
  return Promise.resolve(boards);
}

async function getBoard(boardId) {
  const check = boardRepo.has(boardId);
  if (!check) return Promise.resolve(null);
  const board = boardRepo.get(boardId);
  return Promise.resolve(board);
}

async function createBoard(board) {
  const check = board.title && board.columns && Array.isArray(board.columns);
  if (!check) return Promise.resolve(null);
  const id = uuidv4();
  const newRecord = {
    id,
    title: board.title,
    columns: board.columns,
  }
  boardRepo.set(id, newRecord);
  return Promise.resolve(newRecord);
}

async function updateBoard(board) {
  if (!board.id) return Promise.resolve(null);
  const check = boardRepo.has(board.id);
  if (!check) return Promise.resolve(null);
  const currentBoard = boardRepo.get(board.id);
  const newRecord = {
      id: board.id,
      title: board.title? board.title: currentBoard.title,
      columns: board.columns? board.columns: currentBoard.columns
  }
  boardRepo.set(board.id, newRecord);
  return Promise.resolve(newRecord);
}

async function deleteBoard(boardId) {
  const check = boardRepo.has(boardId);
  if (!check) return Promise.resolve(null);
  const board = boardRepo.get(boardId);
  boardRepo.delete(boardId);
  return Promise.resolve(board);
}

module.exports = {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
}