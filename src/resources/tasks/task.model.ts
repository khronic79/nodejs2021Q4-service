import { Task } from '../types/types';

/**
 * Represents a task in the REST Service realization
 * @public
 */
export class TaskModel {
  /**
  * The unique identificator of the task.
  */
  id: string;

  /**
  * The title of the task.
  */
  title: string | null;

  /**
  * The order of the task.
  */
  order: number;

  /**
  * The description of the task.
  */
  description: string | null;

  /**
  * The user is assigned to the task.
  */
  userId: string | null;

  /**
  * The board contains the task.
  */
  boardId: string | null;

  /**
  * The column contains the task.
  */
  columnId: string | null

   /**
   * Initiates an instance of the class task's data
   * @param task - the task's object of Task type for class's initialiation
   */
  constructor(task: Task) {
    this.id = task.id;
    this.title = task.title;
    this.order = task.order;
    this.description = task.description;
    this.userId = task.userId;
    this.boardId = task.boardId;
    this.columnId = task.columnId;
  }

  /**
  * Filters task's data for response
  * @param task - the task's object
  * 
  * @returns public task's object
  */
  static toResponse(task: Task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}