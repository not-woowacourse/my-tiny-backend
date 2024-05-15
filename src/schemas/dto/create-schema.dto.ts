import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { QuestionParam } from '@/schemas/dto/question-param';
import { Schema } from '@/schemas/entities/schema.entity';

export class CreateSchemaDto extends PickType(Schema, ['slug'] as const) {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionParam)
  @ApiProperty({
    type: () => QuestionParam,
    description: '질문 목록',
    example: [
      {
        key: 'age',
        type: 'integer',
      },
      {
        key: 'gender',
      },
      {
        key: 'mbti',
      },
      {
        key: 'childhoodDream',
      },
      {
        key: 'mostImportantValue',
        isArray: true,
      },
      {
        key: 'lifeSatisfaction',
        type: 'integer',
      },
      {
        key: 'email',
        type: 'email',
        isOptional: true,
      },
    ],
  })
  questions: QuestionParam[];
}
