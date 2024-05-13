import { ApiProperty } from '@nestjs/swagger';

export class CreateFormDto {
  @ApiProperty({
    description: '폼 데이터',
    example: {
      age: 23,
      gender: 'male',
      mbti: 'ISTJ',
      childhoodDream: '유튜버',
      mostImportantValue: ['family', 'etc'],
      lifeSatisfaction: 6,
      email: 'yopark.dev@naver.com',
    },
  })
  data: { [key: string]: any };
}
