import { ApiProperty } from '@nestjs/swagger';

import { Answer } from '@/forms/entities/answer.entity';
import { Form } from '@/forms/entities/form.entity';
import { Question } from '@/schemas/entities/question.entity';

// 여러번 join하여 반환하는 경우 이렇게 클래스를 정의하는게 맞나?
class AnswerWithQuestion extends Answer {
  @ApiProperty({
    type: () => Question,
  })
  question: Question;
}

class FormWithAnswersWithQuestion extends Form {
  @ApiProperty({
    type: () => [AnswerWithQuestion],
  })
  answers: AnswerWithQuestion[];
}

export class ReadFormResponseDto extends FormWithAnswersWithQuestion {}
