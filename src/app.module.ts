import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { ResumesModule } from './resumes/resumes.module';
import { ClientsModule } from './clients/clients.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TodosModule, ResumesModule, ClientsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
