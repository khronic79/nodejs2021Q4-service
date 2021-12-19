import { Board, Column } from '../types/types';

/**
 * Represents a board in the REST Service realization
 * @public
 */
export class BoardModel {
  /**
  * The unique identificator of the board.
  */
  id: string;

  /**
  * The title of the board.
  */
  title: string;

  /**
  * The array of columns.
  */
  columns: Column[];

  /**
  * Initiates an instance of the class board's data
  * @param board - the board's object of Board type for class's initialiation
  */
  constructor(board: Board) {
    this.id = board.id;
    this.title = board.title;
    this.columns = board.columns;
  }

  /**
  * Filters board's data for response
  * @param board - the board's object
  * 
  * @returns public board's object
  */
  static toResponse(board: Board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}
