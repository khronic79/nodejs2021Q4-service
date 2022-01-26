import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './interfaces/tasks.dto';
import { TasksService } from './tasks.service';

@Controller('boards/:boardId/tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async findAll(@Param('boardId') boardId: string) {
    return await this.taskService.findAll(boardId);
  }

  @Get(':taskId')
  async findOne(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ) {
    return await this.taskService.findOne(boardId, taskId);
  }

  @Post()
  async create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return await this.create(boardId, createTaskDto);
  }

  @Put(':taskId')
  async update(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return await this.update(boardId, taskId, updateTaskDto);
  }

  @Delete(':taskId')
  async remove(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ) {
    return await this.remove(boardId, taskId);
  }
}
