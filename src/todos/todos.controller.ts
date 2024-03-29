import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
import { CLIENT_NAME_KEY } from '@/shared/constants/http-header';
import { ClientNameInterceptor } from '@/shared/interceptors/client-name.interceptor';
import { CreateTodoResponseDto } from '@/todos/dto/create-todo-response.dto';
import { ReadTodoResponseDto } from '@/todos/dto/read-todo-response.dto';
import { UpdateTodoResponseDto } from '@/todos/dto/update-todo-response.dto';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';

@UseGuards(ClientGuard)
@UseInterceptors(ClientNameInterceptor)
@Controller('todos')
@ApiTags('1.1. Todos')
@ApiHeader({
  name: CLIENT_NAME_KEY,
  description: '클라이언트 이름',
  required: true,
})
@ApiUnauthorizedResponse({
  description: '클라이언트를 찾을 수 없음',
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
  @ApiBody({ type: CreateTodoDto })
  @ApiCreatedResponse({
    description: '생성됨',
    type: CreateTodoResponseDto,
  })
  @ApiBadRequestResponse({
    description: '사용자 입력 값 오류',
  })
  async create(@Req() request, @Body() createTodoDto: CreateTodoDto) {
    const { clientName } = request;

    const client = await this.clientsService.findOneByName(clientName);

    return this.todosService.create(client, createTodoDto);
  }

  @Get()
  @ApiOperation({
    summary: '모든 할 일 조회',
  })
  @ApiOkResponse({
    description: '성공',
    type: ReadTodoResponseDto,
    isArray: true,
  })
  async findAll(@Req() request) {
    const { clientName } = request;

    const client = await this.clientsService.findOneByName(clientName);

    return this.todosService.findAll(client);
  }

  @Get(':id')
  @ApiOperation({
    summary: '할 일 조회',
  })
  @ApiParam({ name: 'id', description: '할 일 ID' })
  @ApiOkResponse({
    description: '성공',
    type: ReadTodoResponseDto,
  })
  @ApiNotFoundResponse({
    description: '할 일을 찾을 수 없음',
  })
  async findOne(@Req() request, @Param('id') id: string) {
    const { clientName } = request;

    const client = await this.clientsService.findOneByName(clientName);

    return this.todosService.findOne(client, +id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '할 일 수정',
  })
  @ApiBody({ type: UpdateTodoDto })
  @ApiParam({ name: 'id', description: '할 일 ID' })
  @ApiOkResponse({
    description: '성공',
    type: UpdateTodoResponseDto,
  })
  @ApiBadRequestResponse({
    description: '사용자 입력 값 오류',
  })
  @ApiNotFoundResponse({
    description: '할 일을 찾을 수 없음',
  })
  async update(
    @Req() request,
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    const { clientName } = request;

    const client = await this.clientsService.findOneByName(clientName);

    return this.todosService.update(client, +id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '할 일 삭제',
  })
  @ApiParam({ name: 'id', description: '할 일 ID' })
  @ApiOkResponse({
    description: '성공',
  })
  @ApiNotFoundResponse({
    description: '할 일을 찾을 수 없음',
  })
  async remove(@Req() request, @Param('id') id: string) {
    const { clientName } = request;

    const client = await this.clientsService.findOneByName(clientName);

    return this.todosService.remove(client, +id);
  }
}
