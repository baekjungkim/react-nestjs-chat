import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Message } from './message.entity';
import { User } from './user.entity';

@Entity()
export class Check {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Message, (message) => message.checks)
  message: Message;

  @ManyToOne(() => User, (user) => user.checks)
  user: User;
}
