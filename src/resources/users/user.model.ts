import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
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
  
   /**
   * Initiates an instance of the class user's data
   * @param user - the user's object of User type for class's initialiation
   */
/*   constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.login = user.login;
    this.password = user.password;
  } */

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
