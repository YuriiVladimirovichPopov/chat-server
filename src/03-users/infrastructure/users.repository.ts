import { InjectModel } from '@nestjs/sequelize';
import { User } from '../domain/user.model';
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export class UsersRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async createUser(username: string): Promise<User> {
    return this.userModel.create({ username });
  }

  async findUserByName(username: string): Promise<User | null> {
    return this.userModel.findOne({ where: { username } });
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: { id },
      include: { all: true },
    });
    return user;
  }

  async findAllUsers(offset: number, limit: number): Promise<User[]> {
    const users = await this.userModel.findAll({
      include: { all: true },
      offset,
      limit,
    });
    return users;
  }

  async deleteUserById(id: string): Promise<boolean> {
    const user = await this.userModel.findByPk(id);
    await user!.destroy();
    return true;
  }
}
