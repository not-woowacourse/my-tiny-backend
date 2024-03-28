import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
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
import { CLIENT_NAME_KEY } from '@/shared/constants/http-header';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';

@UseGuards(ClientGuard)
@Controller('todos')
@ApiTags('1.1. Todos')
@ApiUnauthorizedResponse({
  description: 'Client-Name의 값이 잘못된 경우',
})
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private readonly clientsService: ClientsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: '할 일 생성',
  })
  @ApiHeader({
    name: CLIENT_NAME_KEY,
    description: '등록한 클라이언트 이름',
    required: true,
  })
  @ApiBody({ type: CreateTodoDto })
  @ApiCreatedResponse({
    description: '할 일 생성 성공',
  })
  async create(
    @Headers(CLIENT_NAME_KEY) clientName: string,
    @Body()
    createTodoDto: CreateTodoDto,
  ) {
    const client = await this.clientsService.findOneByName(clientName);

    return this.todosService.create(client, createTodoDto);
  }

  @Get()
  @ApiOperation({
    summary: '모든 할 일 조회',
  })
  @ApiHeader({
    name: CLIENT_NAME_KEY,
    description: '등록한 클라이언트 이름',
  })
  @ApiOkResponse({
    description: '모든 할 일 조회 성공',
  })
  async findAll(@Headers(CLIENT_NAME_KEY) clientName: string) {
    const client = await this.clientsService.findOneByName(clientName);

    return this.todosService.findAll(client);
  }

  @Get(':id')
  @ApiOperation({
    summary: '할 일 조회',
  })
  @ApiParam({ name: 'id', description: '할 일 ID' })
  @ApiHeader({
    name: CLIENT_NAME_KEY,
    description: '등록한 클라이언트 이름',
  })
  @ApiOkResponse({
    description: '할 일 조회 성공',
  })
  @ApiNotFoundResponse({
    description: '할 일 조회 실패 (존재하지 않는 할 일 ID)',
  })
  async findOne(
    @Param('id') id: string,
    @Headers(CLIENT_NAME_KEY) clientName: string,
  ) {
    const client = await this.clientsService.findOneByName(clientName);

    return this.todosService.findOne(client, +id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '할 일 수정',
  })
  @ApiBody({ type: UpdateTodoDto })
  @ApiParam({ name: 'id', description: '할 일 ID' })
  @ApiHeader({
    name: CLIENT_NAME_KEY,
    description: '등록한 클라이언트 이름',
  })
  @ApiOkResponse({
    description: '할 일 수정 성공',
  })
  @ApiNotFoundResponse({
    description: '할 일 수정 실패 (존재하지 않는 할 일 ID)',
  })
  async update(
    @Param('id') id: string,
    @Headers(CLIENT_NAME_KEY) clientName: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    const client = await this.clientsService.findOneByName(clientName);

    return this.todosService.update(client, +id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '할 일 삭제',
  })
  @ApiParam({ name: 'id', description: '할 일 ID' })
  @ApiHeader({
    name: CLIENT_NAME_KEY,
    description: '등록한 클라이언트 이름',
  })
  @ApiOkResponse({
    description: '할 일 삭제 성공',
  })
  @ApiNotFoundResponse({
    description: '할 일 삭제 실패 (존재하지 않는 할 일 ID)',
  })
  async remove(
    @Param('id') id: string,
    @Headers(CLIENT_NAME_KEY) clientName: string,
  ) {
    const client = await this.clientsService.findOneByName(clientName);

    return this.todosService.remove(client, +id);
  }
}
