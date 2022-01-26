import { Injectable } from '@nestjs/common';
import { BoardDto } from './interfaces/boards.dto';

@Injectable()
export class BoardsService {
  async findAll() {
    return 'findAll';
  }

  async findOne(boardId: string) {
    return 'findAll' + boardId;
  }

  async create(boardDto: BoardDto) {
    return boardDto;
  }

  async update(boardId: string, boardDto: BoardDto) {
    return boardDto;
  }

  async remove(boardId: string) {
    return 'delete' + boardId;
  }
}
