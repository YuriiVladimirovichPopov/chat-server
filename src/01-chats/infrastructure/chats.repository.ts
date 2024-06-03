import { InjectModel } from '@nestjs/sequelize';
import { Chat } from '../domain/chat.model';
import { Injectable, Scope } from '@nestjs/common';
import { User } from '../../03-users/domain/user.model';

@Injectable({ scope: Scope.DEFAULT })
export class ChatsRepository {
  constructor(
    @InjectModel(Chat)
    private readonly chatModel: typeof Chat,
  ) {}

  async createChat(name: string): Promise<Chat | null> {
    return this.chatModel.create({ name });
  }

  async findChatByUserIds(userId: string): Promise<Chat[]> {
    const chats = await this.chatModel.findAll({
      include: [
        {
          model: User,
          where: { id: userId },
          through: { attributes: [] },
        },
      ],
    });
    return chats;
  }

  async findChatByPk(id: string): Promise<Chat | null> {
    return await this.chatModel.findByPk(id);
  }

  async findAllChats(offset: number, limit: number): Promise<Chat[]> {
    const users = await this.chatModel.findAll({
      include: { all: true },
      offset,
      limit,
    });
    return users;
  }

  async deleteChat(id: string): Promise<boolean> {
    await this.chatModel.destroy({ where: { id } });
    return true;
  }
}
