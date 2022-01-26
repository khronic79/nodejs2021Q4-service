import { ColumnDto } from '../../columns/interfaces/columns.dto';

export interface BoardDto {
  title: string;
  columns: ColumnDto[];
}
