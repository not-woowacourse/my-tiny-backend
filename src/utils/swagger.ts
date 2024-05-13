import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('우테코 따라잡기 API 문서')
    .setDescription(
      '이걸 만든 사람은 백엔드 개발자가 아닙니다. 사용해보시고 오류나 빈틈이 있으면 채널톡 부탁드립니다 😭 <br /><br />📝 API 태그 넘버링 기준<ul><li>0. 공통으로 사용하는 API</li><li>1. toodoo 과제에서 사용하는 API</li><li>2. surveey 과제에서 사용하는 API</li></ul>',
    )
    .setExternalDoc(
      '우테코 따라잡기 깃허브 바로가기',
      'https://github.com/not-woowacourse',
    )
    .setVersion('v0.1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
};

export { setupSwagger };
