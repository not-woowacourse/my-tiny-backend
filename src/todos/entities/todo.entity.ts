import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Client } from '@/clients/entities/client.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @ApiProperty({ description: '할 일 ID', example: 1 })
  id: number;

  @Column()
  @IsString()
  @ApiProperty({ description: '할 일 제목', example: '세탁기 돌리기' })
  title: string;

  @Column('text', { nullable: true })
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '할 일 설명',
    example: '흰 옷, 검은 옷 구분하기',
  })
  description: string;

  @Column('boolean', { default: false })
  @IsBoolean()
  @ApiProperty({
    description: '할 일 완료 여부',
    example: false,
  })
  isDone: boolean;

  @CreateDateColumn()
  @ApiProperty({
    description: '할 일 생성 일시',
    example: '2021-07-01T00:00:00.000Z',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: '할 일 수정 일시',
    example: '2021-07-01T00:00:00.000Z',
  })
  updatedAt: Date;

  @ManyToOne(() => Client, (client) => client.todos)
  client: Client;
}
