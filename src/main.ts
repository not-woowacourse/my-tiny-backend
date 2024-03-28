import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { setupSwagger } from '@/utils/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
    ],
  });

  setupSwagger(app);

  await app.listen(3000);

  app.useGlobalPipes(new ValidationPipe());
}
bootstrap();
