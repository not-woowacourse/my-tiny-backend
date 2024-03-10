import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const { name } = createClientDto;
    const existingClient = await this.clientRepository.findOneBy({
      name,
    });

    if (existingClient) {
      throw new BadRequestException('이미 같은 이름의 클라이언트가 존재합니다');
    }

    const client = this.clientRepository.create(createClientDto);

    return await this.clientRepository.save(client);
  }

  async findOneByName(name: string) {
    return await this.clientRepository.findOneBy({
      name,
    });
  }
}
