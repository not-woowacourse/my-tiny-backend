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
  })
  @ApiOkResponse({ description: '서버 살아있음' })
  getHello(): string {
    return this.appService.getHello();
  }
}
