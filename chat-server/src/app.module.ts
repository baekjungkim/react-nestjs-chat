import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayModule } from './gateway/chat.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [GatewayModule, TypeOrmModule.forRoot(), ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
