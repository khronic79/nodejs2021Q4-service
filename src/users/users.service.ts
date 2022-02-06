import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './interfaces/users.dto';
import { User } from './users.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  private toResponse(user: User) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  async findAll() {
    const users = await this.userRepository.getAll();
    return users.map(this.toResponse);
  }

  async getBylogin(login: string) {
    return await this.userRepository.getByLogin(login);
  }

  async findOne(id: string) {
    const user = await this.userRepository.getOne(id);
    return !user ? user : this.toResponse(user);
  }

  async create(userDto: CreateUserDto) {
    const hash = await bcrypt.hash(userDto.password, 10);
    const user = await this.userRepository.createUser({
      ...userDto,
      password: hash,
    });
    return this.toResponse(user);
  }

  async update(userId: string, userDto: UpdateUserDto) {
    const currentUser = await this.userRepository.getOne(userId);
    if (!currentUser) return null;
    let hash = '';
    if (userDto.password) hash = await bcrypt.hash(userDto.password, 10);
    const updatedUser = {
      ...currentUser,
      ...userDto,
      password: userDto.password ? hash : currentUser.password,
    };
    const user = await this.userRepository.updateUser(updatedUser);
    return !user ? user : this.toResponse(user);
  }

  async remove(userId: string) {
    const user = await this.userRepository.deleteUser(userId);
    return !user ? user : this.toResponse(user);
  }
}
