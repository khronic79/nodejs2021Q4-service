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

@Controller('users')
export class UsersController {
  @Get()
  findAll() {
  
  }

  @Get(':id')
  findOne(@Param('id') id: string) {

  }

  @Post()
  create(@Body() userDto: CreateUserDto) {

  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userDto: UpdateUserDto) {

  }

  @Delete('id')
  remove(@Param('id') id: string) {

  }
}
