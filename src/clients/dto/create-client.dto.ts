import { ApiProperty } from '@nestjs/swagger';

// export class CreateClientDto extends PickType(Client, ['name'] as const) {}

export class CreateClientDto {
  @ApiProperty({ description: '이름', example: 'Yongjun Park' })
  name: string;
}
