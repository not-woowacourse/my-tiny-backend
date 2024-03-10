import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async create(createTodoDto: CreateTodoDto) {
    const todo = this.todoRepository.create(createTodoDto);

    return await this.todoRepository.save(todo);
  }

  async findAll() {
    return await this.todoRepository.find();
  }

  async findOne(id: number) {
    return await this.todoRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.findOne(id);

    if (todo === null) {
      throw new NotFoundException();
    }

    Object.assign(todo, updateTodoDto);

    return await this.todoRepository.save(todo);
  }

  async remove(id: number) {
    const todo = this.findOne(id);

    if (todo === null) {
      throw new NotFoundException();
    }

    return await this.todoRepository.delete(id);
  }
}
