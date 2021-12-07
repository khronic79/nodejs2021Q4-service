import { v4 as uuidv4 } from 'uuid';
import { Board, Column } from '../types/types';

export class BoardModel {
  id: string;

  title: string;

  columns: Column[];

  constructor({
    id = uuidv4(),
    title = 'new board',
    columns  = [],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board: Board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}
