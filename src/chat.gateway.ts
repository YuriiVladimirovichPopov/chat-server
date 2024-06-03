import { Inject } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatsService } from './01-chats/application/chats.service';
import { UsersService } from './03-users/application/users.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(ChatsService) private readonly chatsService: ChatsService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() message: { chatId: string; author: string; text: string },
  ): Promise<void> {
    const { chatId, author, text } = message;

    const chat = await this.chatsService.getChatById(chatId);
    if (!chat) {
      throw new Error(`Chat with ID ${chatId} does not exist`);
    }

    const user = await this.usersService.getUserById(author);
    if (!user) {
      throw new Error(`User with ID ${author} does not exist`);
    }

    this.server.to(chatId).emit('message', { chatId, author, text });
  }

  async handleConnection(client: Socket): Promise<void> {
    let { userId, chatId } = client.handshake.query as {
      userId: string | string[];
      chatId: string | string[];
    };

    if (Array.isArray(userId)) {
      userId = userId[0];
    }

    if (Array.isArray(chatId)) {
      chatId = chatId[0];
    }

    if (userId) {
      const user = await this.usersService.getUserById(userId);
      if (!user) {
        console.error(`User with ID ${userId} does not exist`);
        client.disconnect();
        return;
      }
    }

    if (chatId) {
      const chat = await this.chatsService.getChatById(chatId);
      if (!chat) {
        console.error(`Chat with ID ${chatId} does not exist`);
        client.disconnect();
        return;
      }

      client.join(chatId);
      console.log(`User ${userId} connected to chat ${chatId}`);

      this.server.to(chatId).emit('userConnected', {
        userId,
        chatId,
        message: `User ${userId} has connected`,
      });
    } else {
      console.log(`User ${userId} connected`);
    }
  }

  async handleDisconnect(client: Socket): Promise<void> {
    let { userId, chatId } = client.handshake.query as {
      userId: string | string[];
      chatId: string | string[];
    };

    if (Array.isArray(userId)) {
      userId = userId[0];
    }

    if (Array.isArray(chatId)) {
      chatId = chatId[0];
    }

    if (chatId) {
      client.leave(chatId);
      console.log(`User ${userId} disconnected from chat ${chatId}`);

      this.server.to(chatId).emit('userDisconnected', {
        userId,
        chatId,
        message: `User ${userId} has disconnected`,
      });
    } else {
      console.log(`User ${userId} disconnected`);
    }
  }
}
