import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Todo } from '@/todos/entities/todo.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @ApiProperty({
    description: '클라이언트 ID',
    example: 1,
  })
  id: number;

  @Column({ unique: true })
  @IsString()
  @ApiProperty({
    description: '클라이언트 이름',
    example: 'Yongjun Park',
  })
  name: string;

  @OneToMany(() => Todo, (todo) => todo.client)
  todos: Todo[];
}
