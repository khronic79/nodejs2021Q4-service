import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './boards.repository';
import { BoardDto } from './interfaces/boards.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private userRepository: BoardRepository,
  ) {}

  async findAll() {
    return await this.userRepository.getAll();
  }

  async findOne(id: string) {
    return await this.userRepository.getOne(id);
  }

  async create(boardDto: BoardDto) {
    return await this.userRepository.createBoard(boardDto);
  }

  async update(boardId: string, boardDto: BoardDto) {
    const currentBoard = await this.userRepository.getOne(boardId);
    if (!currentBoard) return null;
    const updatedBoard = { ...currentBoard, ...boardDto };
    return await this.userRepository.updateBoard(boardId, updatedBoard);
  }

  async remove(boardId: string) {
    return await this.userRepository.deleteBoard(boardId);
  }
}
