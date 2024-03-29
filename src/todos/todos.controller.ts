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
  @ApiBody({ type: CreateTodoDto })
  @ApiCreatedResponse({
    description: '할 일 생성 성공',
    type: CreateTodoResponseDto,
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
    description: '모든 할 일 조회 성공',
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
    description: '할 일 조회 성공',
  })
  @ApiNotFoundResponse({
    description: '할 일 조회 실패 (존재하지 않는 할 일 ID)',
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
    description: '할 일 수정 성공',
  })
  @ApiNotFoundResponse({
    description: '할 일 수정 실패 (존재하지 않는 할 일 ID)',
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
    description: '할 일 삭제 성공',
  })
  @ApiNotFoundResponse({
    description: '할 일 삭제 실패 (존재하지 않는 할 일 ID)',
  })
  async remove(@Req() request, @Param('id') id: string) {
    const { clientName } = request;

    const client = await this.clientsService.findOneByName(clientName);

    return this.todosService.remove(client, +id);
  }
}
