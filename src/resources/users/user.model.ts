import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TaskModel } from '../tasks/task.model';
import { User } from '../types/types';

/**
 * Represents a user in the REST Service realization
 * @public
 */
@Entity()
export class UserModel {
  /**
  * The unique identificator of the user.
  */
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  /**
  * The name of the user.
  */
  @Column()
  name?: string;

  /**
  * The user's login.
  */
  @Column()
  login?: string;

  /**
  * The user's password.
  */
  @Column()
  password?: string;

  @OneToMany(() => TaskModel, task => task.user)
  tasks?: TaskModel[];
  
  /**
  * Filters user's data for response
  * @param user - the user's object
  * 
  * @returns public user's object
  */
  static toResponse(user: User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
