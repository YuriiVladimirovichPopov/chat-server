import {
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  Model,
} from 'sequelize-typescript';
import { Chat } from '../../01-chats/domain/chat.model';
import { User } from '../../03-users/domain/user.model';

@Table({ tableName: 'messages' })
export class Message extends Model<Message> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Chat)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  chatId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  authorId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @BelongsTo(() => Chat)
  chat: Chat;

  @BelongsTo(() => User, 'authorId')
  author: User;
}
