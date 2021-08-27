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

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  msg: string;

  @Column({ type: 'varchar' })
  msgType: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;

  @OneToMany(() => Check, (check) => check.message)
  checks: Check[];
}
