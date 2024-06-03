import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserCreateDto } from './models/user.create.dto';
import { UsersService } from '../application/users.service';
import { PaginationDto } from 'src/other dto/pagination.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UsePipes(ValidationPipe)
  @Post()
  @HttpCode(201)
  async create(@Body() userDto: UserCreateDto) {
    const newUser = await this.userService.createUser(userDto);
    return newUser;
  }

  @Get()
  @HttpCode(200)
  async getAllUsers(@Query() paginationDto: PaginationDto) {
    return await this.userService.getUsers(paginationDto);
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param() id: string) {
    return await this.userService.getUserById(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUserById(id);
  }
}
