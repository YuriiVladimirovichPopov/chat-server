import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { ChatCreateDto } from '../api/models/chat.create.dto';
import { Chat } from '../domain/chat.model';
import { ChatsRepository } from '../infrastructure/chats.repository';
import { PaginationDto } from 'src/other dto/pagination.dto';
import { UsersService } from 'src/03-users/application/users.service';

@Injectable({ scope: Scope.DEFAULT })
export class ChatsService {
  constructor(
    private readonly chatsRepository: ChatsRepository,
    private readonly usersService: UsersService,
  ) {}

  async createChat(chatDto: ChatCreateDto) {
    const newChat = await this.chatsRepository.createChat(chatDto.name);
    if (!newChat) {
      throw new HttpException(
        { message: 'something went wrong' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return newChat;
  }

  async getAllChats(paginationDto: PaginationDto): Promise<Chat[]> {
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

    const chats = await this.chatsRepository.findAllChats(offset, limit);
    return chats;
  }

  async getChatById(id: string) {
    const chat = await this.chatsRepository.findChatByPk(id);
    if (!chat) {
      throw new HttpException(
        `Chat with ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return chat;
  }

  async findChatByUserId(userId: string): Promise<Chat[]> {
    const userExists = await this.usersService.getUserById(userId);
    if (!userExists) {
      throw new HttpException(
        `User with id ${userId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const chats = await this.chatsRepository.findChatByUserIds(userId);
    return chats;
  }

  async deleteChatById(id: string) {
    const chat = await this.chatsRepository.findChatByPk(id);
    if (!chat) {
      throw new HttpException(
        `Chat with ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.chatsRepository.deleteChat(id);
    return true;
  }
}
