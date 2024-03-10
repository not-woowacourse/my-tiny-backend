import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientsModule } from '@/clients/clients.module';

import { Todo } from './entities/todo.entity';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), ClientsModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
