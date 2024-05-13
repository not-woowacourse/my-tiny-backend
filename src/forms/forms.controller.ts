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

  @Post(':schemaId')
  @ApiOperation({
    summary: '폼 제출',
  })
  @ApiParam({
    name: 'schemaId',
    description: '스키마 ID',
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
    @Param('schemaId') schemaId: string,
    @Body() createFormDto: CreateFormDto,
  ) {
    const client = await this.clientsService.findOneByName(clientName);

    const schemaWithQuestions = await this.schemasService.findOneWithQuestions(
      client,
      +schemaId,
    );

    if (schemaWithQuestions === null) {
      throw new NotFoundException('스키마를 찾을 수 없습니다.');
    }

    return this.formsService.create(schemaWithQuestions, createFormDto);
  }

  @Get(':schemaId')
  @ApiOperation({
    summary: '모든 폼 조회',
  })
  @ApiParam({
    name: 'schemaId',
    description: '스키마 ID',
  })
  @ApiOkResponse({
    description: '성공',
    type: ReadFormResponseDto,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: '스키마를 찾을 수 없음',
  })
  async findAll(@Req() { clientName }, @Param('schemaId') schemaId: string) {
    const client = await this.clientsService.findOneByName(clientName);

    const schema = await this.schemasService.findOne(client, +schemaId);

    if (schema === null) {
      throw new NotFoundException('스키마를 찾을 수 없습니다.');
    }

    return await this.formsService.findAll(schema);
  }

  @Get(':schemaId/:id')
  @ApiOperation({
    summary: '폼 조회',
  })
  @ApiParam({
    name: 'schemaId',
    description: '스키마 ID',
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
    description: '폼을 찾을 수 없음 (잘못된 스키마 ID 또는 폼 ID)',
  })
  async findOneById(
    @Req() { clientName },
    @Param('schemaId') schemaId: string,
    @Param('id') id: string,
  ) {
    const client = await this.clientsService.findOneByName(clientName);

    const schema = await this.schemasService.findOne(client, +schemaId);

    if (schema === null) {
      throw new NotFoundException('스키마를 찾을 수 없습니다.');
    }

    return await this.formsService.findOne(schema, +id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '폼 삭제',
  })
  @ApiParam({
    name: 'id',
    description: '폼 ID',
  })
  @ApiOkResponse({
    description: '성공',
  })
  @ApiNotFoundResponse({
    description: '폼을 찾을 수 없음 (잘못된 스키마 ID 또는 폼 ID)',
  })
  async remove(@Req() { clientName }, @Param('id') id: string) {
    const client = await this.clientsService.findOneByName(clientName);

    return await this.formsService.remove(client, +id);
  }
}
