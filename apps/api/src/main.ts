import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule, {});

  app.setGlobalPrefix('/v1');

  await app.listen(3000);
}
bootstrap();
