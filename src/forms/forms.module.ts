import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientsModule } from '@/clients/clients.module';
import { Answer } from '@/forms/entities/answer.entity';
import { Form } from '@/forms/entities/form.entity';
import { SchemasModule } from '@/schemas/schemas.module';

import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Form, Answer]),
    ClientsModule,
    SchemasModule,
  ],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
