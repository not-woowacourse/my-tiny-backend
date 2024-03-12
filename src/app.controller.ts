import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

@Controller()
@ApiTags('앱 API (모든 과제에서 공통으로 사용)')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: '서버 살아있는지 확인',
    description:
      'Cloudtype이라는 백엔드 무료 배포 서비스를 이용하고 있는데, 며칠 안 쓰면 꺼지는 것 같더라구요... 과제하시다가 접근 자체가 안되면 저한테 연락주세요! 아 그런데 서버가 다운되면 Swagger도 안되는구나...',
  })
  @ApiOkResponse({ description: '서버 살아있음' })
  getHello(): string {
    return this.appService.getHello();
  }
}
