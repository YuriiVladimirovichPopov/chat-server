import { Module } from '@nestjs/common';
import { ChatsService } from './application/chats.service';
import { ChatsController } from './api/chats.controller';
import { ChatsRepository } from './infrastructure/chats.repository';
import { UsersModule } from '../03-users/users.module';
import { DatabaseModule } from '../database-module/database.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [ChatsService, ChatsRepository],
  controllers: [ChatsController],
  exports: [ChatsService, ChatsRepository],
})
export class ChatsModule {}
