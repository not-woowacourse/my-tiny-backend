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
import { NotWoowacourseClientGuard } from 'src/auth/not-woowacourse-client.guard';
import { ClientsService } from 'src/clients/clients.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';

@UseGuards(NotWoowacourseClientGuard)
@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private readonly clientsService: ClientsService,
  ) {}

  @Post()
  async create(
    @Headers('Not-Woowacourse-Client-Name'.toLowerCase()) clientName: string,
    @Body()
    createTodoDto: CreateTodoDto,
  ) {
    const client = await this.clientsService.findOneByName(clientName);

    return this.todosService.create(client, createTodoDto);
  }

  @Get()
  async findAll(
    @Headers('Not-Woowacourse-Client-Name'.toLowerCase()) clientName: string,
  ) {
    const client = await this.clientsService.findOneByName(clientName);

    return this.todosService.findAll(client);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Headers('Not-Woowacourse-Client-Name'.toLowerCase()) clientName: string,
  ) {
    const client = await this.clientsService.findOneByName(clientName);

    return this.todosService.findOne(client, +id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Headers('Not-Woowacourse-Client-Name'.toLowerCase()) clientName: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    const client = await this.clientsService.findOneByName(clientName);

    return this.todosService.update(client, +id, updateTodoDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Headers('Not-Woowacourse-Client-Name'.toLowerCase()) clientName: string,
  ) {
    const client = await this.clientsService.findOneByName(clientName);

    return this.todosService.remove(client, +id);
  }
}
