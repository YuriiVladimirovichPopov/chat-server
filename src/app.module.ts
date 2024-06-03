import { Module } from '@nestjs/common';
import { UsersModule } from './03-users/users.module';
import { ChatsModule } from './01-chats/chats.module';
import { MessagesModule } from './02-messages/messages.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database-module/database.module';
import { ChatGateway } from './chat.gateway';
import configuration from './settings/configuration';

@Module({
  imports: [
    UsersModule,
    ChatsModule,
    MessagesModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  providers: [ChatGateway],
})
export class AppModule {}
