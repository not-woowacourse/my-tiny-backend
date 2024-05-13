import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ClientGuard } from '@/auth/client.guard';
import { ClientsService } from '@/clients/clients.service';
import { CreateSchemaResponseDto } from '@/schemas/dto/create-schema.response.dto';
import { CLIENT_NAME_KEY } from '@/shared/constants/http-header';
import { ClientNameInterceptor } from '@/shared/interceptors/client-name.interceptor';

import { CreateSchemaDto } from './dto/create-schema.dto';
import { SchemasService } from './schemas.service';

@UseGuards(ClientGuard)
@UseInterceptors(ClientNameInterceptor)
@Controller('schemas')
@ApiTags('2.1. Schemas')
@ApiHeader({
  name: CLIENT_NAME_KEY,
  description: '클라이언트 이름',
  required: true,
})
@ApiUnauthorizedResponse({
  description: '클라이언트를 찾을 수 없음',
})
export class SchemasController {
  constructor(
    private readonly schemasService: SchemasService,
    private readonly clientsService: ClientsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: '스키마 등록',
    description:
      '설문마다 스키마가 다르므로 폼을 제출하기 전에 스키마를 등록해야 합니다.',
  })
  @ApiCreatedResponse({
    description: '생성됨',
    type: CreateSchemaResponseDto,
  })
  @ApiBadRequestResponse({
    description: '사용자 입력 값 오류 (잘못된 타입 등)',
  })
  async create(
    @Req() { clientName },
    @Body() createSchemaDto: CreateSchemaDto,
  ) {
    const client = await this.clientsService.findOneByName(clientName);

    return this.schemasService.create(client, createSchemaDto);
  }
}
