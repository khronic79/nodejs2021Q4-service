import { Injectable } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './interfaces/tasks.dto';

@Injectable()
export class TasksService {
  async findAll(boardId: string) {
    return 'findAll' + boardId;
  }

  async findOne(boardId: string, taskId: string) {
    return 'findAll' + boardId + taskId;
  }

  async create(boardId: string, taskDto: CreateTaskDto) {
    return taskDto;
  }

  async update(boardId: string, taskId: string, taskDto: UpdateTaskDto) {
    return taskDto;
  }

  async remove(boardId: string, taskId: string) {
    return 'delete' + boardId + taskId;
  }
}
