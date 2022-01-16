import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BoardModel } from '../boards/board.model';

/**
 * Represents a column in the REST Service realization
 * @public
 */
@Entity()
export class ColumnModel {
  /**
  * The unique identificator of the column.
  */
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  /**
  * The title of the column.
  */
  @Column()
  title?: string;

  /**
  * The order of the column.
  */
  @Column()
  order?: number;

  @ManyToOne(() => BoardModel, board => board.columns, {onDelete: 'CASCADE'})
  board?: BoardModel;
}