import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Client } from '@/clients/entities/client.entity';
import { Question } from '@/schemas/entities/question.entity';
import { Schema } from '@/schemas/entities/schema.entity';

import { CreateSchemaDto } from './dto/create-schema.dto';

@Injectable()
export class SchemasService {
  constructor(
    @InjectRepository(Schema)
    private readonly schemaRepository: Repository<Schema>,

    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async create(client: Client, createSchemaDto: CreateSchemaDto) {
    const { questions } = createSchemaDto;

    const schema = this.schemaRepository.create({ client });

    await this.schemaRepository.save(schema);

    questions.forEach(async (questionParam) => {
      await this.questionRepository.save({ schema, ...questionParam });
    });

    return schema;
  }

  async findOne(client: Client, id: number) {
    return await this.schemaRepository.findOneBy({ client, id });
  }

  async findOneWithQuestions(client: Client, id: number) {
    return await this.schemaRepository.findOne({
      where: { client, id },
      relations: ['questions'],
    });
  }
}
