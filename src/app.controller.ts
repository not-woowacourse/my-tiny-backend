import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

@Controller()
@ApiTags('0.1. App')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: '헬스 체크',
  })
  @ApiOkResponse({ description: '서버 살아있음' })
  getHello(): string {
    return this.appService.getHello();
  }
}
