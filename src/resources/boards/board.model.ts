import { TaskModel } from '../tasks/task.model';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Board } from '../types/types';

/**
 * Represents a board in the REST Service realization
 * @public
 */
@Entity()
export class BoardModel {
  /**
  * The unique identificator of the board.
  */
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  /**
  * The title of the board.
  */
  @Column()
  title?: string;

  /**
  * The array of columns.
  */
  @Column()
  columns?: String;

  @OneToMany(() => TaskModel, task => task.user)
  tasks?: TaskModel[];

  /**
  * Filters board's data for response
  * @param board - the board's object
  * 
  * @returns public board's object
  */
  static toResponse(board: Board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}
