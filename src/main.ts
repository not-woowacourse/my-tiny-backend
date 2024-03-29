import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { setupSwagger } from '@/utils/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:10242'],
  });

  setupSwagger(app);

  await app.listen(10241);

  app.useGlobalPipes(new ValidationPipe());
}
bootstrap();
