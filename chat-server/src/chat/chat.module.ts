import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/entity/message.entity';
import { Chat } from 'src/entity/chat.entity';
import { User } from 'src/entity/user.entity';
import { JoinChat } from 'src/entity/joinChat.entity';
import { Check } from 'src/entity/check.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Message, User, JoinChat, Check])],
  providers: [ChatService],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
