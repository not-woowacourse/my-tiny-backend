import { BadRequestException, Injectable } from '@nestjs/common';
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
    const { slug, questions } = createSchemaDto;

    const existingSchema = await this.schemaRepository.findOneBy({
      slug,
    });

    if (existingSchema) {
      throw new BadRequestException('이미 같은 슬러그의 스키마가 존재합니다');
    }

    const schema = this.schemaRepository.create({ client, slug });

    await this.schemaRepository.save(schema);

    questions.forEach(async (questionParam) => {
      await this.questionRepository.save({ schema, ...questionParam });
    });

    return schema;
  }

  async findOne(client: Client, slug: string) {
    return await this.schemaRepository.findOneBy({ client, slug });
  }

  async findOneWithQuestions(client: Client, slug: string) {
    return await this.schemaRepository.findOne({
      where: { client, slug },
      relations: ['questions'],
    });
  }
}
