import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PaginationDto } from 'src/other dto/pagination.dto';
import { ChatCreateDto } from './models/chat.create.dto';
import { ChatsService } from '../application/chats.service';
import { Chat } from '../domain/chat.model';
import { Response } from 'express';

@Controller('chats')
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @UsePipes(ValidationPipe)
  @Post()
  @HttpCode(201)
  async create(@Body() chatDto: ChatCreateDto) {
    const newOrder = await this.chatsService.createChat(chatDto);
    return newOrder;
  }

  @Get()
  @HttpCode(200)
  async getAllChats(@Query() paginationDto: PaginationDto) {
    return await this.chatsService.getAllChats(paginationDto);
  }

  @Get(':id')
  @HttpCode(200)
  async getChatById(@Param('id') orderId: string) {
    return await this.chatsService.getChatById(orderId);
  }

  @Get('/user/:userId')
  async findChatByUserId(@Param('userId') userId: string): Promise<Chat[]> {
    return await this.chatsService.findChatByUserId(userId);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteChat(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<boolean> {
    await this.chatsService.deleteChatById(id);
    res
      .status(HttpStatus.NOT_FOUND)
      .send({ message: `Chat with ${id} deleted successfully` });
    return true;
  }
}
