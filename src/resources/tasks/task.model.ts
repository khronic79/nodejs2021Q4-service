import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserModel } from '../users/user.model';
import { Task } from '../types/types';
import { BoardModel } from '../boards/board.model';

/**
 * Represents a task in the REST Service realization
 * @public
 */
@Entity()
export class TaskModel {
  /**
  * The unique identificator of the task.
  */
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  /**
  * The title of the task.
  */
  @Column()
  title?: string;

  /**
  * The order of the task.
  */
  @Column()
  order?: number;

  /**
  * The description of the task.
  */
  @Column()
  description?: string;

  /**
  * The user is assigned to the task.
  */
  @ManyToOne(() => UserModel, user => user.tasks)
  user?: string;

  /**
  * The board contains the task.
  */
  @ManyToOne(() => BoardModel, board => board.tasks)
  board?: string;

  /**
  * The column contains the task.
  */
  @Column()
  columnId?: string

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