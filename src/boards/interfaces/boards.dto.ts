import { ColumnDto } from '../../columns/interfaces/columns.dto';
import { IsString, IsDefined, IsArray } from 'class-validator';

export class BoardDto {
  @IsDefined()
  @IsString()
  title: string;

  @IsDefined()
  @IsArray()
  columns: ColumnDto[];
}
