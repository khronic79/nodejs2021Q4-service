import { IsString, IsDefined, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  login: string;

  @IsDefined()
  @IsString()
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsDefined()
  @IsString()
  login: string;

  @IsOptional()
  @IsString()
  password?: string;
}
