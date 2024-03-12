// export class UpdateTodoDto extends PartialType(PickType(Todo, ['content', 'isDone'] as const)) {}

import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto {
  @ApiProperty({
    description: '할 일 내용',
    example: '세탁기 돌리기',
    required: false,
  })
  content?: string;

  @ApiProperty({
    description: '할 일 완료 여부',
    example: false,
    required: false,
  })
  isDone?: boolean;
}
