import { ApiProperty } from '@nestjs/swagger';

import { Question } from '@/schemas/entities/question.entity';
import { Schema } from '@/schemas/entities/schema.entity';

class SchemaWithQuestions extends Schema {
  @ApiProperty({
    type: () => [Question],
  })
  questions: Question[];
}

export class ReadSchemaResponseDto extends SchemaWithQuestions {}
