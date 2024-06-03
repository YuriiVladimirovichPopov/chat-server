import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../03-users/domain/user.model';
import { ConfigurationType } from '../settings/configuration';
import { UsersChat } from '../03-users/domain/usersChat.model';
import { Chat } from '../01-chats/domain/chat.model';
import { Message } from '../02-messages/domain/message.model';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService<ConfigurationType, true>) => {
        const databaseSettings = configService.get('databaseSettings', {
          infer: true,
        });

        return {
          dialect: 'postgres',
          host: databaseSettings.host,
          port: databaseSettings.port,
          username: databaseSettings.username,
          password: databaseSettings.password,
          database: databaseSettings.database,
          autoLoadModels: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    SequelizeModule.forFeature([User, Chat, Message, UsersChat]),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
