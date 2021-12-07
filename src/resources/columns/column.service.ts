import { v4 as uuidv4 } from 'uuid';
import { Column, NewColumn } from '../types/types';

function createColumns(oldColumns: Column[], newColumns: Array<Column | NewColumn>): Column[] {
  const result = newColumns
    .filter((column) => (column.title && column.order))
    .map((column) => {
      if ('id' in column) return column;
      return {
        id: uuidv4(),
        ...column
      };
    });
  oldColumns.forEach((oldColumn) => {
    const check = result.findIndex((newColumn) => newColumn.id === oldColumn.id);
    if (check < 0) result.push(oldColumn);
  });
  return result;
}

export const columnService = {
  createColumns
}