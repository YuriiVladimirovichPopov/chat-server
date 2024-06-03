import { Injectable, Scope } from '@nestjs/common';

import { Message } from '../domain/message.model';
import { InjectModel } from '@nestjs/sequelize';
import { MessageCreateDto } from '../api/models/message.create.dto';
import { User } from '../../03-users/domain/user.model';
import { Chat } from '../../01-chats/domain/chat.model';

@Injectable({ scope: Scope.DEFAULT })
export class MessagesRepository {
  constructor(
    @InjectModel(Message)
    private readonly messageModel: typeof Message,
    @InjectModel(Chat)
    private readonly chatModel: typeof Chat,
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async createMessage(createMessageDto: MessageCreateDto) {
    return this.messageModel.create({ ...createMessageDto });
  }

  async findAllMessagesByChatId(chatId: string): Promise<Message[]> {
    return this.messageModel.findAll({
      where: { chatId },
      order: [['createdAt', 'ASC']],
      include: [User, Chat],
    });
  }

  async deleteMessage(messageid: string): Promise<boolean> {
    const message = await this.messageModel.findByPk(messageid);
    await message!.destroy();
    return true;
  }
}
