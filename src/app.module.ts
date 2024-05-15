import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientsModule } from '@/clients/clients.module';
import { Client } from '@/clients/entities/client.entity';
import { Answer } from '@/forms/entities/answer.entity';
import { Form } from '@/forms/entities/form.entity';
import { Question } from '@/schemas/entities/question.entity';
import { Schema } from '@/schemas/entities/schema.entity';
import { Todo } from '@/todos/entities/todo.entity';
import { TodosModule } from '@/todos/todos.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormsModule } from './forms/forms.module';
import { SchemasModule } from './schemas/schemas.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Todo, Client, Schema, Question, Form, Answer],
        synchronize: true, // Don't use this in production
        // ssl: {
        //   rejectUnauthorized: false,
        // },
      }),
    }),
    TodosModule,
    ClientsModule,
    SchemasModule,
    FormsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
