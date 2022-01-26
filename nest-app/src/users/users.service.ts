import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './interfaces/users.dto';

@Injectable()
export class UsersService {
  async findAll() {
    return 'findAll';
  }

  async findOne(id: string) {
    return 'findAll' + id;
  }

  async create(userDto: CreateUserDto) {
    return userDto;
  }

  async update(userId: string, userDto: UpdateUserDto) {
    return userDto;
  }

  async remove(id: string) {
    return 'delete' + id;
  }
}
