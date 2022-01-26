import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './interfaces/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async findAll(): Promise<string> {
    return await this.userService.findAll();
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string): Promise<string> {
    return await this.userService.findOne(userId);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return await this.userService.create(createUserDto);
  }

  @Put(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    return await this.userService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  async remove(@Param('userId') userId: string): Promise<string> {
    return await this.userService.remove(userId);
  }
}
