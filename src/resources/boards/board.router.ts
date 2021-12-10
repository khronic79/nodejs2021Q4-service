import Router from 'koa-router';
import { handlers } from './board.handler';

export const router = new Router();

router
  .get('/boards', handlers.getAllBoards)
  .get('/boards/:boardId', handlers.getBoard)
  .post('/boards', handlers.createBoard)
  .put('/boards/:boardId', handlers.updateBoard)
  .delete('/boards/:boardId', handlers.deleteBoard);

