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
import { MessagesService } from '../application/messages.service';
import { MessageCreateDto } from './models/message.create.dto';
import { Response } from 'express';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UsePipes(ValidationPipe)
  @Post()
  @HttpCode(201)
  async create(@Body() createMessageDto: MessageCreateDto) {
    const newMessage = await this.messagesService.create(createMessageDto);
    return newMessage;
  }

  @Get()
  @HttpCode(200)
  async findAllByChat(@Query('chatId') chatId: string) {
    return await this.messagesService.findAllMessagesByChat(chatId);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteMessage(
    @Param('id') messageId: string,
    @Res() res: Response,
  ): Promise<boolean> {
    await this.messagesService.deleteMessage(messageId);
    res
      .status(HttpStatus.NO_CONTENT)
      .send({ message: `Message with ${messageId} deleted successfully` });
    return true;
  }
}
