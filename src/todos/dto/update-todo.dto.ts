import { PartialType, PickType } from '@nestjs/swagger';

import { Todo } from '@/todos/entities/todo.entity';

export class UpdateTodoDto extends PartialType(
  PickType(Todo, ['title', 'description', 'priority', 'isDone'] as const),
) {}
