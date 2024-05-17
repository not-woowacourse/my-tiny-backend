import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

export class BatchDeleteFormDto {
  @ApiProperty({
    description: '삭제할 폼 ID 배열',
    example: [1, 2, 3],
    type: [Number],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  ids: number[];
}
