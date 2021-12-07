import { v4 as uuidv4 } from 'uuid';
import { Column } from '../types/types';

export class ColumnModel {
  id: string;

  title: string;

  order: number;

  constructor({
    id = uuidv4(),
    title = 'new column',
    order  = 0,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(column: Column) {
    const { id, title, order } = column;
    return { id, title, order };
  }
}