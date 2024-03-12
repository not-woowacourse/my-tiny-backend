// export class CreateTodoDto extends PickType(Todo, ['content'] as const) {}

import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ description: '할 일 내용', example: '세탁기 돌리기' })
  content: string;
}
