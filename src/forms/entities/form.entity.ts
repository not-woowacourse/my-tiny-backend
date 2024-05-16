import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Answer } from '@/forms/entities/answer.entity';
import { Schema } from '@/schemas/entities/schema.entity';

@Entity()
export class Form {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @ApiProperty({ description: '폼 ID', example: 1 })
  id: number;

  @CreateDateColumn()
  @ApiProperty({
    description: '폼 생성 일시',
    example: '2021-07-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ManyToOne(() => Schema, (schema) => schema.forms)
  schema: Schema;

  @OneToMany(() => Answer, (answer) => answer.form)
  answers: Answer[];
}
