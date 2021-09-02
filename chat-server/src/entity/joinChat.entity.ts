import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { Chat } from './chat.entity';
import { Message } from './message.entity';
import { User } from './user.entity';

@Entity()
export class JoinChat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', default: 0 })
  notReadMsgCnt: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.joinChats)
  user: User;

  @ManyToOne(() => Chat, (chat) => chat.joinChats)
  chat: Chat;

  @ManyToOne(() => Message, (message) => message.joinChats)
  checkedLastMessage: Message;
}
