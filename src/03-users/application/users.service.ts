import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { UserCreateDto } from '../api/models/user.create.dto';
import { User } from '../domain/user.model';
import { PaginationDto } from 'src/other dto/pagination.dto';
import { UsersRepository } from '../infrastructure/users.repository';

@Injectable({ scope: Scope.DEFAULT })
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async createUser(userDto: UserCreateDto) {
    const newUser = await this.userRepository.createUser(userDto.username);

    if (!newUser) {
      throw new HttpException(
        { message: 'User creation failed' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return newUser;
  }

  async getUsers(paginationDto: PaginationDto): Promise<User[]> {
    const { page, limit } = paginationDto;

    if (
      typeof page !== 'number' ||
      typeof limit !== 'number' ||
      page <= 0 ||
      limit <= 0
    ) {
      throw new Error('Invalid pagination parameters');
    }
    const offset = (page - 1) * limit;

    const users = await this.userRepository.findAllUsers(offset, limit);
    return users;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new HttpException(
        `User with ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async deleteUserById(id: string) {
    const user = await this.userRepository.deleteUserById(id);
    if (!user) {
      throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return { message: `User ${id} deleted successfully` };
  }
}
