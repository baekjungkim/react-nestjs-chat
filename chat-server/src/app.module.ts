import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayModule } from './gateway/chat.module';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [GatewayModule, TypeOrmModule.forRoot(), ChatModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
