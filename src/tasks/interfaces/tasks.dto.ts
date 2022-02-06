import {
  IsString,
  IsDefined,
  IsUUID,
  ValidateIf,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateTaskDto {
  @ValidateIf((o) => o.title == null)
  @IsString()
  title: string | null;

  @IsDefined()
  @IsNumber()
  order: number;

  @ValidateIf((o) => o.title == null)
  @IsString()
  description: string | null;

  @ValidateIf((o) => o.title == null)
  @IsUUID()
  columnId: string | null;

  @ValidateIf((o) => o.title == null)
  @IsUUID()
  userId: string | null;

  @ValidateIf((o) => o.title == null)
  @IsUUID()
  boardId: string | null;
}

export class UpdateTaskDto {
  @ValidateIf((o) => o.title == null)
  @IsOptional()
  title?: string | null;

  @IsNumber()
  order: number;

  @ValidateIf((o) => o.title == null)
  @IsOptional()
  description?: string | null;

  @ValidateIf((o) => o.title == null)
  @IsOptional()
  @IsUUID()
  columnId?: string | null;

  @ValidateIf((o) => o.title == null)
  @IsOptional()
  @IsUUID()
  userId?: string | null;

  @ValidateIf((o) => o.title == null)
  @IsOptional()
  @IsUUID()
  boardId?: string | null;
}
