import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { QuestionParam } from '@/schemas/dto/question-param';

export class CreateSchemaDto {
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
