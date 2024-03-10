import { PickType } from '@nestjs/mapped-types';
import { Todo } from 'src/todos/entities/todo.entity';

export class CreateTodoDto extends PickType(Todo, ['content'] as const) {}
