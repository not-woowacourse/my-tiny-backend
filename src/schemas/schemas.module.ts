import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientsModule } from '@/clients/clients.module';
import { Question } from '@/schemas/entities/question.entity';
import { Schema } from '@/schemas/entities/schema.entity';

import { SchemasController } from './schemas.controller';
import { SchemasService } from './schemas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Schema, Question]), ClientsModule],
  controllers: [SchemasController],
  providers: [SchemasService],
  exports: [SchemasService],
})
export class SchemasModule {}
