import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { User } from './user.model';
import { Chat } from '../../01-chats/domain/chat.model';

@Table
export class UsersChat extends Model {
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: string;

  @ForeignKey(() => Chat)
  @Column({ allowNull: false })
  chatId: string;
}
