import { Task } from '../tasks/tasks.entity';
import { ColumnEntity } from '../columns/columns.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => ColumnEntity, (column) => column.board, { cascade: true })
  columns: ColumnEntity[];

  @OneToMany(() => Task, (task) => task.board, {
    cascade: ['remove', 'soft-remove'],
  })
  tasks: Task[];
}
