import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Answer } from '@/forms/entities/answer.entity';
import { Schema } from '@/schemas/entities/schema.entity';
import { QuestionTypeEnum } from '@/schemas/enums/quesion-type.enum';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @ApiProperty({
    description: '질문 ID',
    example: 1,
  })
  id: number;

  @Column()
  @IsString()
  @ApiProperty({ description: '질문 키', example: 'childhoodDream' })
  key: string;

  @Column('enum', {
    enum: QuestionTypeEnum,
    default: QuestionTypeEnum.Text,
  })
  @IsOptional()
  @IsEnum(QuestionTypeEnum)
  @ApiPropertyOptional({
    description:
      '질문 타입 (text, integer, double, boolean, email, tel, url, color, date, datetime, json)',
    example: 'text',
  })
  type: QuestionTypeEnum;

  @Column('boolean', {
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ description: '질문 타입의 배열 여부', example: false })
  isArray: boolean;

  @Column('boolean', {
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ description: '질문 선택 여부', example: false })
  isOptional: boolean;

  @ManyToOne(() => Schema, (schema) => schema.questions)
  schema: Schema;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}
