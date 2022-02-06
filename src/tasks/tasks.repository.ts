import { Task } from './tasks.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './interfaces/tasks.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getAll(boardId: string) {
    return await this.find({
      where: [{ boardId }],
    });
  }

  async getOne(boardId: string, taskId: string) {
    return await this.findOne({
      where: [{ boardId, id: taskId }],
    });
  }

  async createTask(createTaskDto: CreateTaskDto) {
    return await this.save(createTaskDto);
  }

  async updateTask(updateTask: Task) {
    return await this.save(updateTask);
  }

  async deleteTask(boardId: string, taskId: string) {
    return (
      await this.createQueryBuilder()
        .delete()
        .where('id = :id and boardId = :boardId', { id: taskId, boardId })
        .returning([
          'id',
          'title',
          'order',
          'description',
          'columnId',
          'userId',
          'boardId',
        ])
        .execute()
    ).raw[0];
  }
}
