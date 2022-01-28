import { Board } from './boards.entity';
import { EntityRepository, Repository } from 'typeorm';
import { BoardDto } from './interfaces/boards.dto';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async getAll() {
    return await this.createQueryBuilder('board')
      .leftJoinAndSelect('board.columns', 'column')
      .orderBy('column.order', 'ASC')
      .getMany();
  }

  async getOne(id: string) {
    return await this.createQueryBuilder('board')
      .leftJoinAndSelect('board.columns', 'column')
      .where('board.id = :id', { id })
      .orderBy('column.order', 'ASC')
      .getOne();
  }

  async createBoard(boardDto: BoardDto) {
    return await this.save(boardDto);
  }

  async updateBoard(boardId: string, updateBoard: BoardDto) {
    await this.save({ ...updateBoard, id: boardId });
    return this.createQueryBuilder('board')
      .leftJoinAndSelect('board.columns', 'column')
      .where('board.id = :id', { id: boardId })
      .orderBy('column.order', 'ASC')
      .getOne();
  }

  async deleteBoard(id: string) {
    return (
      await this.createQueryBuilder()
        .delete()
        .where('id = :id', { id })
        .returning(['id', 'title', 'columns'])
        .execute()
    ).raw[0];
  }
}
