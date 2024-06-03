import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { Message } from '../domain/message.model';
import { MessageCreateDto } from '../api/models/message.create.dto';
import { MessagesRepository } from '../infrastructure/messages.repository';
import { ChatsService } from '../../01-chats/application/chats.service';
import { UsersService } from 'src/03-users/application/users.service';

@Injectable({ scope: Scope.DEFAULT })
export class MessagesService {
  constructor(
    private readonly messagesRepository: MessagesRepository,
    private readonly usersService: UsersService,
    private readonly chatsService: ChatsService,
  ) {}

  async create(createMessageDto: MessageCreateDto): Promise<Message> {
    const chat = await this.chatsService.getChatById(createMessageDto.chatId);
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    const author = await this.usersService.getUserById(
      createMessageDto.authorId,
    );
    if (!author) {
      throw new NotFoundException('User not found');
    }

    const message =
      await this.messagesRepository.createMessage(createMessageDto);
    return message;
  }
  //+
  async findAllMessagesByChat(chatId: string): Promise<Message[]> {
    const allMessages =
      await this.messagesRepository.findAllMessagesByChatId(chatId);
    if (!allMessages) {
      throw new NotFoundException(`Could not find all messages`);
    }
    return allMessages;
  }

  async deleteMessage(messageId: string): Promise<boolean> {
    const messages = await this.messagesRepository.deleteMessage(messageId);
    if (!messages) {
      throw new NotFoundException('Message not found');
    }
    return true;
  }
}
