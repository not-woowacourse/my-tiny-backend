import { Injectable } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Injectable()
export class AppService {
  getHello(): string {
    return '우리 서버 정상 작동합니다 ✌️ /api-docs로 이동하여 API 문서를 확인해보세요!';
  }
}
