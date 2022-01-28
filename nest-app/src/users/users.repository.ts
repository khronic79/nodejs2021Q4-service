import { User } from './users.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './interfaces/users.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getAll() {
    return await this.find();
  }

  async getOne(id: string) {
    return await this.findOne({
      where: [{ id }],
    });
  }

  async getByLogin(login: string) {
    return await this.findOne({
      where: [
        {
          login,
        },
      ],
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    return await this.save(createUserDto);
  }

  async updateUser(updateUser: User) {
    return await this.save(updateUser);
  }

  async deleteUser(id: string) {
    return (
      await this.createQueryBuilder()
        .delete()
        .where('id = :id', { id })
        .returning(['id', 'name', 'login', 'password'])
        .execute()
    ).raw[0];
  }
}
