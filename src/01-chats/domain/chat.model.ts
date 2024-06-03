import {
  Table,
  Column,
  DataType,
  BelongsToMany,
  Model,
} from 'sequelize-typescript';
import { User } from 'src/03-users/domain/user.model';
import { UsersChat } from 'src/03-users/domain/usersChat.model';

@Table
export class Chat extends Model<Chat> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @BelongsToMany(() => User, () => UsersChat)
  users: User[];
}
