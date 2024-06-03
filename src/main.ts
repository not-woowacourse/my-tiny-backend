import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { setupSwagger } from '@/utils/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      /* localhost */
      'http://localhost:10242',

      /* 시연용 */
      'https://not-woowacourse-1-toodoo-frontend-for-example.vercel.app',
      'https://not-woowacourse-2-surveey-frontend-for-example.vercel.app',
      'https://not-woowacourse-3-searzh-frontend-for-example.vercel.app',

      /* 도구 */
      'https://not-woowacourse-2-surveey-admin.yopark.dev',

      /* 과제 제출자 */
      'https://not-woowacourse.te6.in',
      'https://not-woowacourse-toodoo.yopark.dev',
      'https://not-woowacourse-1-toodoo-frontend-jet.vercel.app',
      'https://nextjs-session-1-toodoo.vercel.app',
      'https://one-hope.vercel.app',
      'https://2-surveey-frontend-umber.vercel.app',
      'https://not-woowacourse-surveey.yopark.dev',
    ],
  });

  setupSwagger(app);

  await app.listen(10241);

  app.useGlobalPipes(new ValidationPipe());
}
bootstrap();
