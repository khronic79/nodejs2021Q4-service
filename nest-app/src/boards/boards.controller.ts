import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BoardsService } from './boards.service';
import { BoardDto } from './interfaces/boards.dto';

@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  async findAll() {
    return await this.boardsService.findAll();
  }

  @Get(':boardId')
  async findOne(@Param('boardId') boardId: string) {
    const result = await this.boardsService.findOne(boardId);
    if (!result)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `There is not board with ID ${boardId}`,
        },
        HttpStatus.NOT_FOUND,
      );
    return result;
  }

  @Post()
  async create(@Body() boardDto: BoardDto) {
    return await this.boardsService.create(boardDto);
  }

  @Put(':boardId')
  async update(@Param('boardId') boardId: string, @Body() boardDto: BoardDto) {
    const result = await this.boardsService.update(boardId, boardDto);
    if (!result)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `There is not board with ID ${boardId}`,
        },
        HttpStatus.NOT_FOUND,
      );
    return result;
  }

  @Delete(':boardId')
  async remove(@Param('boardId') boardId: string) {
    const result = await this.boardsService.remove(boardId);
    if (!result)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `There is not board with ID ${boardId}`,
        },
        HttpStatus.NOT_FOUND,
      );
    return result;
  }
}
