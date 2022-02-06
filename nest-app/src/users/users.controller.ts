import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto, UpdateUserDto } from './interfaces/users.dto';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':userId')
  async findOne(@Param('userId', ParseUUIDPipe) userId: string) {
    const result = await this.userService.findOne(userId);
    if (!result)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `There is not user with ID ${userId}`,
        },
        HttpStatus.NOT_FOUND,
      );
    return result;
  }

  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Put(':userId')
  async update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    const result = await this.userService.update(userId, updateUserDto);
    if (!result)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `There is not user with ID ${userId}`,
        },
        HttpStatus.NOT_FOUND,
      );
    return result;
  }

  @Delete(':userId')
  async remove(@Param('userId', ParseUUIDPipe) userId: string) {
    const result = await this.userService.remove(userId);
    if (!result)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `There is not user with ID ${userId}`,
        },
        HttpStatus.NOT_FOUND,
      );
    return result;
  }
}
