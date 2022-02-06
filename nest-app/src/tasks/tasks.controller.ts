import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTaskDto, UpdateTaskDto } from './interfaces/tasks.dto';
import { TasksService } from './tasks.service';

@UseGuards(JwtAuthGuard)
@Controller('boards/:boardId/tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async findAll(@Param('boardId', ParseUUIDPipe) boardId: string) {
    return await this.taskService.findAll(boardId);
  }

  @Get(':taskId')
  async findOne(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    const result = await this.taskService.findOne(boardId, taskId);
    if (!result)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `There is not board or task with boardID ${boardId} or taskId ${taskId}`,
        },
        HttpStatus.NOT_FOUND,
      );
    return result;
  }

  @Post()
  async create(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Body(new ValidationPipe()) createTaskDto: CreateTaskDto,
  ) {
    return await this.taskService.create(boardId, createTaskDto);
  }

  @Put(':taskId')
  async update(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body(new ValidationPipe()) updateTaskDto: UpdateTaskDto,
  ) {
    const result = await this.taskService.update(
      boardId,
      taskId,
      updateTaskDto,
    );
    if (!result)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `There is not board or task with boardID ${boardId} or taskId ${taskId}`,
        },
        HttpStatus.NOT_FOUND,
      );
    return result;
  }

  @Delete(':taskId')
  async remove(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    const result = await this.taskService.remove(boardId, taskId);
    if (!result)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `There is not board or task with boardID ${boardId} or taskId ${taskId}`,
        },
        HttpStatus.NOT_FOUND,
      );
    return result;
  }
}
