import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { NotWoowacourseAdminGuard } from '@/auth/not-woowacourse-admin.guard';
import { CreateClientResponseDto } from '@/clients/dto/create-client.response.dto';
import { NOT_WOOWACOURSE_ADMIN_PASSWORD_KEY } from '@/shared/constants/http-header';

import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';

@UseGuards(NotWoowacourseAdminGuard)
@Controller('clients')
@ApiTags('클라이언트 API (모든 과제에서 공통으로 사용)')
@ApiHeader({
  name: NOT_WOOWACOURSE_ADMIN_PASSWORD_KEY,
  description: '어드민 비밀번호입니다. 이 값은 세션 시간에 알려드릴게요! 😊',
  required: true,
})
@ApiUnauthorizedResponse({
  description: 'Not-Woowacourse-Admin-Password가 틀린 경우',
})
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({
    summary: '클라이언트 등록',
    description:
      '이건 프론트 코드에 넣는게 아니고 과제 수행하시기 전에 별도 요청을 보내셔서 등록을 하셔야 하는 겁니다. 하는 이유는... 1) 과제 진행자들끼리 데이터가 겹치면 안되니까 분리하기 위함이고, 2) 이상한 데서 쓸데없는 요청을 못하게 방지하는 용도입니다 👍 회원가입, 로그인 페이지를 따로 안 만드셔도 돼서 시간이 꽤 절약 될거에요. POST만 가능하고 GET, PATCH, DELETE는 못하게 막아놓았습니다. 만약 까먹으셨다면 제가 pgAdmin으로 봐드릴게요! 근데 그냥 새로 만드시는게 빠를 겁니다.',
  })
  @ApiBody({ type: CreateClientDto })
  @ApiCreatedResponse({
    description: '클라이언트 등록 성공',
    type: CreateClientResponseDto,
  })
  @ApiBadRequestResponse({
    description: '클라이언트 등록 실패 (100% 확률로 이름 중복)',
  })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }
}
