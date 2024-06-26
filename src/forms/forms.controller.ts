import {
  Body,
  Controller,
  Delete,
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
  ApiBody,
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
import { BatchDeleteFormDto } from '@/forms/dto/batch-delete-form.dto';
import { CreateFormResponseDto } from '@/forms/dto/create-form.response.dto';
import { ReadFormResponseDto } from '@/forms/dto/read-form-response.dto';
import { SchemasService } from '@/schemas/schemas.service';
import { CLIENT_NAME_KEY } from '@/shared/constants/http-header';
import { ClientNameInterceptor } from '@/shared/interceptors/client-name.interceptor';

import { CreateFormDto } from './dto/create-form.dto';
import { FormsService } from './forms.service';

@UseGuards(ClientGuard)
@UseInterceptors(ClientNameInterceptor)
@Controller('forms')
@ApiTags('2.2. Forms')
@ApiHeader({
  name: CLIENT_NAME_KEY,
  description: '클라이언트 이름',
  required: true,
})
@ApiUnauthorizedResponse({
  description: '클라이언트를 찾을 수 없음',
})
export class FormsController {
  constructor(
    private readonly formsService: FormsService,
    private readonly schemasService: SchemasService,
    private readonly clientsService: ClientsService,
  ) {}

  @Post(':slug')
  @ApiOperation({
    summary: '폼 제출',
  })
  @ApiParam({
    name: 'slug',
    description: '스키마 슬러그',
  })
  @ApiBody({
    type: CreateFormDto,
  })
  @ApiCreatedResponse({
    description: '생성됨',
    type: CreateFormResponseDto,
  })
  @ApiBadRequestResponse({
    description: '사용자 입력 값 오류 (스키마에 맞지 않는 값)',
  })
  @ApiNotFoundResponse({
    description: '스키마를 찾을 수 없음',
  })
  async create(
    @Req() { clientName },
    @Param('slug') slug: string,
    @Body() createFormDto: CreateFormDto,
  ) {
    const client = await this.clientsService.findOneByName(clientName);

    const schemaWithQuestions = await this.schemasService.findOneWithQuestions(
      client,
      slug,
    );

    if (schemaWithQuestions === null) {
      throw new NotFoundException('스키마를 찾을 수 없습니다.');
    }

    return this.formsService.create(schemaWithQuestions, createFormDto);
  }

  @Get(':slug')
  @ApiOperation({
    summary: '모든 폼 조회',
  })
  @ApiParam({
    name: 'slug',
    description: '스키마 슬러그',
  })
  @ApiOkResponse({
    description: '성공',
    type: ReadFormResponseDto,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: '스키마를 찾을 수 없음',
  })
  async findAll(@Req() { clientName }, @Param('slug') slug: string) {
    const client = await this.clientsService.findOneByName(clientName);

    const schema = await this.schemasService.findOne(client, slug);

    if (schema === null) {
      throw new NotFoundException('스키마를 찾을 수 없습니다.');
    }

    return await this.formsService.findAll(schema);
  }

  @Get(':slug/:id')
  @ApiOperation({
    summary: '폼 조회',
  })
  @ApiParam({
    name: 'slug',
    description: '스키마 슬러그',
  })
  @ApiParam({
    name: 'id',
    description: '폼 ID',
  })
  @ApiOkResponse({
    description: '성공',
    type: ReadFormResponseDto,
  })
  @ApiNotFoundResponse({
    description: '폼을 찾을 수 없음 (잘못된 스키마 슬러그 또는 폼 ID)',
  })
  async findOneById(
    @Req() { clientName },
    @Param('slug') slug: string,
    @Param('id') id: number,
  ) {
    const client = await this.clientsService.findOneByName(clientName);

    const schema = await this.schemasService.findOne(client, slug);

    if (schema === null) {
      throw new NotFoundException('스키마를 찾을 수 없습니다.');
    }

    return await this.formsService.findOne(schema, id);
  }

  @Delete(':slug/:id')
  @ApiOperation({
    summary: '폼 삭제',
  })
  @ApiParam({
    name: 'slug',
    description: '스키마 슬러그',
  })
  @ApiParam({
    name: 'id',
    description: '폼 ID',
  })
  @ApiOkResponse({
    description: '성공',
  })
  @ApiNotFoundResponse({
    description: '폼을 찾을 수 없음 (잘못된 스키마 슬러그 또는 폼 ID)',
  })
  async remove(
    @Req() { clientName },
    @Param('slug') slug: string,
    @Param('id') id: number,
  ) {
    const client = await this.clientsService.findOneByName(clientName);

    const schema = await this.schemasService.findOne(client, slug);

    if (schema === null) {
      throw new NotFoundException('스키마를 찾을 수 없습니다.');
    }

    return await this.formsService.remove(client, id);
  }

  @Post(':slug/batch-delete')
  @ApiOperation({
    summary: '폼 일괄 삭제',
  })
  @ApiParam({
    name: 'slug',
    description: '스키마 슬러그',
  })
  @ApiBody({
    type: BatchDeleteFormDto,
  })
  @ApiOkResponse({
    description: '성공',
  })
  @ApiNotFoundResponse({
    description: '폼을 찾을 수 없음 (잘못된 스키마 슬러그 또는 폼 ID)',
  })
  async batchRemove(
    @Req() { clientName },
    @Param('slug') slug: string,
    @Body() batchDeleteFormDto: BatchDeleteFormDto,
  ) {
    const client = await this.clientsService.findOneByName(clientName);

    const schema = await this.schemasService.findOne(client, slug);

    if (schema === null) {
      throw new NotFoundException('스키마를 찾을 수 없습니다.');
    }

    const { ids } = batchDeleteFormDto;

    return await this.formsService.batchRemove(client, ids);
  }
}
