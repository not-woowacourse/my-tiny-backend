import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { setupSwagger } from '@/utils/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:10242',
      'https://not-woowacourse-1-toodoo-frontend-for-example.vercel.app',
      'https://not-woowacourse.te6.in',
      'https://not-woowacourse-toodoo.yopark.dev',
    ],
  });

  setupSwagger(app);

  await app.listen(10241);

  app.useGlobalPipes(new ValidationPipe());
}
bootstrap();
