import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Chat } from './chat.entity';
import { User } from './user.entity';
import { Check } from './check.entity';
import { JoinChat } from './joinChat.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  msg: string;

  @Column({ type: 'varchar' })
  msgType: string;

  @Column({ type: 'integer', default: 1 })
  readUserCnt: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;

  @OneToMany(() => Check, (check) => check.message)
  checks: Check[];

  @OneToMany(() => JoinChat, (joinChat) => joinChat.checkedLastMessage)
  joinChats: JoinChat[];
}
