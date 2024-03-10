import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Todo } from '@/todos/entities/todo.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Todo, (todo) => todo.client)
  todos: Todo[];
}
