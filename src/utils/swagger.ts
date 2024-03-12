import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('우테코 따라잡기 API 문서')
    .setDescription(
      '이걸 만든 사람은 백엔드 개발자가 아닙니다. 사용해보시고 오류나 빈틈이 있으면 채널톡 부탁드립니다 😭 (과제명 참고: 1-toodoo, 2-reecruit, 3-ohauth)',
    )
    .setExternalDoc(
      '우테코 따라잡기 깃허브 바로가기',
      'https://github.com/not-woowacourse',
    )
    .setVersion('v0.1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document);
};

export { setupSwagger };
