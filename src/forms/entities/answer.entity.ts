import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Form } from '@/forms/entities/form.entity';
import { Question } from '@/schemas/entities/question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @ApiProperty({
    description: '답변 ID',
    example: 1,
  })
  id: number;

  /**
   * @note
   * - 질문 타입에 따라 stringValue, numberValue, booleanValue, dateValue 중 하나만 사용
   * - stringValue: text, email, url, color, json
   * - numberValue: number
   * - booleanValue: boolean
   * - dateValue: date, datetime
   */
  @Column({ nullable: true })
  @IsString()
  @ApiPropertyOptional({
    description: '답변 값 (문자열)',
    example: 'Yongjun Park',
  })
  stringValue: string;

  @Column('integer', { nullable: true })
  @IsNumber()
  @ApiPropertyOptional({
    description: '답변 값 (정수)',
    example: 123,
  })
  integerValue: number;

  @Column('double precision', { nullable: true })
  @IsNumber()
  @ApiPropertyOptional({
    description: '답변 값 (실수)',
    example: 123.45,
  })
  doubleValue: number;

  @Column('boolean', { nullable: true })
  @IsBoolean()
  @ApiPropertyOptional({
    description: '답변 값 (불리언)',
    example: true,
  })
  booleanValue: boolean;

  @Column('date', { nullable: true })
  @IsDate()
  @ApiPropertyOptional({
    description: '답변 값 (날짜)',
    example: '2021-07-01',
  })
  dateValue: Date;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;

  @ManyToOne(() => Form, (form) => form.answers, {
    onDelete: 'CASCADE',
  })
  form: Form;
}
