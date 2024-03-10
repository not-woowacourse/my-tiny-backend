import { PickType } from '@nestjs/mapped-types';
import { Client } from 'src/clients/entities/client.entity';

export class CreateClientDto extends PickType(Client, ['name'] as const) {}
