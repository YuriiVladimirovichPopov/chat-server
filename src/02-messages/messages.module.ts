import { Module } from '@nestjs/common';
import { MessagesService } from './application/messages.service';
import { MessagesController } from './api/messages.controller';
import { MessagesRepository } from './infrastructure/messages.repository';
import { ChatsModule } from '../01-chats/chats.module';
import { UsersModule } from '../03-users/users.module';
import { DatabaseModule } from '../database-module/database.module';

@Module({
  imports: [DatabaseModule, UsersModule, ChatsModule],
  providers: [MessagesService, MessagesRepository],
  controllers: [MessagesController],
  exports: [MessagesService, MessagesRepository],
})
export class MessagesModule {}
