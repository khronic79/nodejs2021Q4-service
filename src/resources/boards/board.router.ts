import Router from 'koa-router';
import * as services from './board.service';

export const router = new Router();

router
  .get('/boards', services.getAllBoards)
  .get('/boards/:boardId', services.getBoard)
  .post('/boards', services.createBoard)
  .put('/boards/:boardId', services.updateBoard)
  .delete('/boards/:boardId', services.deleteBoard);

