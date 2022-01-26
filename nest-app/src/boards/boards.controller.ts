import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardDto } from './interfaces/boards.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  async findAll(): Promise<string> {
    return await this.boardsService.findAll();
  }

  @Get(':boardId')
  async findOne(@Param('boardId') boardId: string): Promise<string> {
    return await this.boardsService.findOne(boardId);
  }

  @Post()
  async create(@Body() boardDto: BoardDto): Promise<BoardDto> {
    return await this.boardsService.create(boardDto);
  }

  @Put(':boardId')
  async update(
    @Param('boardId') boardId: string,
    @Body() boardDto: BoardDto,
  ): Promise<BoardDto> {
    return await this.boardsService.update(boardId, boardDto);
  }

  @Delete(':boardId')
  async remove(@Param('boardId') boardId: string): Promise<string> {
    return await this.boardsService.remove(boardId);
  }
}
