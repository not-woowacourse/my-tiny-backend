import { PickType } from '@nestjs/swagger';

import { Question } from '@/schemas/entities/question.entity';

export class QuestionParam extends PickType(Question, [
  'key',
  'type',
  'isArray',
  'isOptional',
] as const) {}
