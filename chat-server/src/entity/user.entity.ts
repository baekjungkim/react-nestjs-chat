import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Chat } from './chat.entity';
import { Check } from './check.entity';
import { JoinChat } from './joinChat.entity';
import { Message } from './message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  profileImage: string;

  @OneToMany(() => JoinChat, (joinChat) => joinChat.user)
  joinChats: JoinChat[];

  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat[];

  @OneToMany(() => Check, (check) => check.user)
  checks: Check[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];
}
