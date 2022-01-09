import { Column } from '../types/types';

/**
 * Represents a column in the REST Service realization
 * @public
 */
export class ColumnModel {
  /**
  * The unique identificator of the column.
  */
  id: string;

  /**
  * The title of the column.
  */
  title: string;

  /**
  * The order of the column.
  */
  order: number;

  /**
  * Initiates an instance of the class column's data
  * @param column - the column's object of Column type for class's initialiation
  */
  constructor(column: Column) {
    this.id = column.id;
    this.title = column.title;
    this.order = column.order;
  }

  /**
  * Filters column's data for response
  * @param column - the column's object
  * 
  * @returns public column's object
  */
  static toResponse(column: Column) {
    const { id, title, order } = column;
    return { id, title, order };
  }
}