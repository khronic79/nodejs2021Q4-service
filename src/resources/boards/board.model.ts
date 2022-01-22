import { TaskModel } from '../tasks/task.model';
import { ColumnModel } from '../columns/column.model';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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
  @OneToMany(() => ColumnModel, column => column.board, {cascade: true})
  columns?: ColumnModel[];

  @OneToMany(() => TaskModel, task => task.board, {cascade: ['remove', 'soft-remove']})
  tasks?: TaskModel[];
}
