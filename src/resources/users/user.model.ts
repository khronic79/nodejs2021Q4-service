import { v4 as uuidv4 } from 'uuid';
import { User } from '../types/types';

export class UserModel {
  id: string;

  name: string;

  login: string;

  password: string;
  
  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
