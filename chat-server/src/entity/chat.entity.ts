import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { JoinChat } from './joinChat.entity';
import { Message } from './message.entity';
import { User } from './user.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'text', nullable: true })
  msg: string;

  @Column({ type: 'varchar', nullable: true })
  msgType: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.chats)
  user: User;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @OneToMany(() => JoinChat, (JoinChat) => JoinChat.chat)
  joinChats: JoinChat[];
}
