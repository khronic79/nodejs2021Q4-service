import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserModel } from '../users/user.model';
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
  @ManyToOne(() => UserModel, user => user.tasks, {onDelete: 'SET NULL'})
  @JoinColumn({ name: 'userId' })
  user?: UserModel;

  /**
  * The board contains the task.
  */
  @ManyToOne(() => BoardModel, board => board.tasks, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'boardId' })
  board?: BoardModel;

  /**
  * The column contains the task.
  */
  @Column({
    nullable: true
  })
  columnId?: string;

  @Column('uuid', {
    nullable: true
  })
  userId?: string;

  @Column('uuid', {
    nullable: true
  })
  boardId?: string;
}