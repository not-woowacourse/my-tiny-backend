import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateClientResponseDto } from '@/clients/dto/create-client.response.dto';

import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('clients')
@ApiTags('클라이언트 API (모든 과제에서 공통으로 사용)')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({
    summary: '클라이언트 등록',
    description:
      '과제 진행자 간 데이터 분리를 위해 사전에 클라이언트를 등록해야 합니다.',
  })
  @ApiBody({ type: CreateClientDto })
  @ApiCreatedResponse({
    description: '클라이언트 등록 성공',
    type: CreateClientResponseDto,
  })
  @ApiBadRequestResponse({
    description: '클라이언트 등록 실패 (이름 중복)',
  })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }
}
