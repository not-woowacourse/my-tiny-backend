import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { Todo } from 'src/todos/entities/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(client: Client, createTodoDto: CreateTodoDto) {
    const todo = this.todoRepository.create({ ...createTodoDto, client });

    return await this.todoRepository.save(todo);
  }

  async findAll(client: Client) {
    return await this.todoRepository.findBy({ client });
  }

  async findOne(client: Client, id: number) {
    return await this.todoRepository.findOneBy({
      client,
      id,
    });
  }

  async update(client: Client, id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.findOne(client, id);

    if (todo === null) {
      throw new NotFoundException();
    }

    Object.assign(todo, updateTodoDto);

    return await this.todoRepository.save(todo);
  }

  async remove(client: Client, id: number) {
    const todo = this.findOne(client, id);

    if (todo === null) {
      throw new NotFoundException();
    }

    return await this.todoRepository.delete(id);
  }
}
