import { NestFactory } from '@nestjs/core';
import { RedisIoAdapter } from './adapter/redis.adapter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useWebSocketAdapter(new RedisIoAdapter(app));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
