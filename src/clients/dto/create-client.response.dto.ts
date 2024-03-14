import { ApiProperty } from '@nestjs/swagger';

export class CreateClientResponseDto {
  @ApiProperty({ description: '클라이언트 ID', example: 1 })
  id: number;

  @ApiProperty({ description: '이름', example: 'Yongjun Park' })
  name: string;
}
