import { v4 as uuidv4 } from 'uuid';
import { Task } from '../types/types';

export class TaskModel {
  id: string;

  title: string | null;

  order: number;

  description: string | null;

  userId: string | null;

  boardId: string | null;

  columnId: string | null


  constructor({
    id = uuidv4(),
    title = 'task',
    order = 0,
    description = 'description',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task: Task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}