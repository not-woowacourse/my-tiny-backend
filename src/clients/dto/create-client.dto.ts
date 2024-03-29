import { PickType } from '@nestjs/swagger';

import { Client } from '@/clients/entities/client.entity';

export class CreateClientDto extends PickType(Client, ['name'] as const) {}
