import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto, UpdateTaskDto } from './interfaces/tasks.dto';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private userRepository: TaskRepository,
  ) {}

  async findAll(boardId: string) {
    return await this.userRepository.getAll(boardId);
  }

  async findOne(boardId: string, taskId: string) {
    return await this.userRepository.getOne(boardId, taskId);
  }

  async create(boardId: string, createTaskDto: CreateTaskDto) {
    return await this.userRepository.createTask({ ...createTaskDto, boardId });
  }

  async update(boardId: string, taskId: string, updateTaskDto: UpdateTaskDto) {
    const currentTask = await this.userRepository.getOne(boardId, taskId);
    if (!currentTask) return null;
    const updatedTask = { ...currentTask, ...updateTaskDto };
    return await this.userRepository.updateTask(updatedTask);
  }

  async remove(boardId: string, taskId: string) {
    return await this.userRepository.deleteTask(boardId, taskId);
  }
}
