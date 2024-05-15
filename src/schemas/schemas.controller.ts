import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ClientGuard } from '@/auth/client.guard';
import { ClientsService } from '@/clients/clients.service';
import { CreateSchemaResponseDto } from '@/schemas/dto/create-schema.response.dto';
import { ReadSchemaResponseDto } from '@/schemas/dto/read-schema.response.dto';
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
    description: '사용자 입력 값 오류 (슬러그 중복, 잘못된 타입 등)',
  })
  async create(
    @Req() { clientName },
    @Body() createSchemaDto: CreateSchemaDto,
  ) {
    const client = await this.clientsService.findOneByName(clientName);

    return this.schemasService.create(client, createSchemaDto);
  }

  @Get(':slug')
  @ApiOperation({
    summary: '스키마 조회',
  })
  @ApiParam({
    name: 'slug',
    description: '스키마 슬러그',
  })
  @ApiOkResponse({
    description: '성공',
    type: ReadSchemaResponseDto,
  })
  @ApiNotFoundResponse({
    description: '스키마를 찾을 수 없음 (잘못된 스키마 슬러그)',
  })
  async findOne(@Req() { clientName }, @Param('slug') slug: string) {
    const client = await this.clientsService.findOneByName(clientName);

    const schema = await this.schemasService.findOne(client, slug);

    if (schema === null) {
      throw new NotFoundException('스키마를 찾을 수 없습니다.');
    }

    return schema;
  }
}
