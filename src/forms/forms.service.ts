import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Client } from '@/clients/entities/client.entity';
import { Answer } from '@/forms/entities/answer.entity';
import { Form } from '@/forms/entities/form.entity';
import { isValidQuestionType } from '@/forms/utils/is-valid-question-type';
import { Question } from '@/schemas/entities/question.entity';
import { Schema } from '@/schemas/entities/schema.entity';
import { QuestionTypeEnum } from '@/schemas/enums/quesion-type.enum';

import { CreateFormDto } from './dto/create-form.dto';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>,

    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  validateAnswerOrThrow(question: Question, answer: any) {
    const { key, type, isArray } = question;

    if (isArray && !Array.isArray(answer)) {
      throw new BadRequestException(
        `폼이 유효하지 않습니다. ${key}가 배열이 아닙니다.`,
      );
    }

    if (isArray) {
      answer.forEach((element) => {
        if (!isValidQuestionType(type, element)) {
          throw new BadRequestException(
            `폼이 유효하지 않습니다. ${key}가 ${type} 타입 배열이 아닙니다.`,
          );
        }
      });
    } else {
      if (!isValidQuestionType(type, answer)) {
        throw new BadRequestException(
          `폼이 유효하지 않습니다. ${key}가 ${type} 타입이 아닙니다.`,
        );
      }
    }
  }

  validateFormOrThrow(questions: Question[], data: { [key: string]: any }) {
    questions.forEach((question) => {
      const { key, isOptional } = question;

      if (isOptional && !(key in data)) {
        return;
      }

      if (!isOptional && !(key in data)) {
        throw new BadRequestException(
          `폼이 유효하지 않습니다. ${key}가 없습니다.`,
        );
      }

      const answer = data[key];

      this.validateAnswerOrThrow(question, answer);
    });
  }

  async create(schema: Schema, createFormDto: CreateFormDto) {
    const { questions } = schema;

    const { data } = createFormDto;

    this.validateFormOrThrow(questions, data);

    const form = this.formRepository.create({ schema });

    await this.formRepository.save(form);

    Object.entries(data).forEach(async ([key, value]) => {
      const question = questions.find((question) => question.key === key);

      if (question === undefined) {
        throw new BadRequestException(); // unreachable because of validateFormOrThrow
      }

      if (question.isArray) {
        const answer = this.answerRepository.create({
          form,
          question,
          stringValue: JSON.stringify(value),
        });

        return await this.answerRepository.save(answer);
      }

      let answer: Answer;

      switch (question.type) {
        case QuestionTypeEnum.Text:
        case QuestionTypeEnum.Email:
        case QuestionTypeEnum.Telephone:
        case QuestionTypeEnum.Url:
        case QuestionTypeEnum.Color:
        case QuestionTypeEnum.Json:
          answer = this.answerRepository.create({
            form,
            question,
            stringValue: value,
          });
          break;

        case QuestionTypeEnum.Integer:
          answer = this.answerRepository.create({
            form,
            question,
            integerValue: value,
          });
          break;

        case QuestionTypeEnum.Double:
          answer = this.answerRepository.create({
            form,
            question,
            doubleValue: value,
          });
          break;

        case QuestionTypeEnum.Boolean:
          answer = this.answerRepository.create({
            form,
            question,
            booleanValue: value,
          });
          break;

        case QuestionTypeEnum.Date:
        case QuestionTypeEnum.Datetime:
          answer = this.answerRepository.create({
            form,
            question,
            dateValue: value,
          });
          break;

        default:
          throw new BadRequestException(); // unreachable because of isValidQuestionType
      }

      return await this.answerRepository.save(answer);
    });

    return form;
  }

  async findAll(schema: Schema) {
    return await this.formRepository.find({
      where: { schema },
      relations: ['answers', 'answers.question'],
    });
  }

  async findOne(schema: Schema, id: number) {
    const form = await this.formRepository.findOne({
      where: { schema, id },
      relations: ['answers', 'answers.question'],
    });

    if (form === null) {
      throw new NotFoundException('폼을 찾을 수 없습니다.');
    }

    return form;
  }

  async remove(client: Client, id: number) {
    const form = await this.formRepository.findOne({
      where: { schema: { client }, id },
    });

    if (form === null) {
      throw new NotFoundException('폼을 찾을 수 없습니다.');
    }

    return await this.formRepository.delete(id);
  }
}
