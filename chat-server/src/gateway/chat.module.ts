import { Module } from '@nestjs/common';
import { ChatModule } from 'src/chat/chat.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [ChatModule],
  providers: [ChatGateway],
})
export class GatewayModule {}
