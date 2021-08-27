import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Chat } from './chat.entity';
import { User } from './user.entity';

@Entity()
export class JoinChat {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.joinChats)
  user: User;

  @ManyToOne(() => Chat, (chat) => chat.joinChats)
  chat: Chat;
  // chat  ManyToOne
}
