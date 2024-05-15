import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Client } from '@/clients/entities/client.entity';
import { Form } from '@/forms/entities/form.entity';
import { Question } from '@/schemas/entities/question.entity';

@Entity()
export class Schema {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @ApiProperty({
    description: '스키마 ID',
    example: 1,
  })
  id: number;

  @Column({ unique: true })
  @IsString()
  @ApiProperty({
    description: '스키마 슬러그',
    example: 'umore-2024',
  })
  slug: string;

  @ManyToOne(() => Client, (client) => client.schemas)
  @ApiProperty({
    type: () => Client,
    description: '스키마를 등록한 클라이언트',
  })
  client: Client;

  @OneToMany(() => Form, (form) => form.schema)
  forms: Form[];

  @OneToMany(() => Question, (question) => question.schema)
  questions: Question[];
}
