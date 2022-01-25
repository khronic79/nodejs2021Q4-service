import { User } from './users.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './interfaces/users.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  createDog = async (dogDto: CreateUserDto) => {
    return await this.save(dogDto);
  };
}
