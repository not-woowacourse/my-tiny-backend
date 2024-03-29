import { PickType } from '@nestjs/swagger';

import { Todo } from '@/todos/entities/todo.entity';

export class CreateTodoDto extends PickType(Todo, ['title'] as const) {}
