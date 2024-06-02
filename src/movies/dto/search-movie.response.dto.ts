import { ApiProperty, OmitType } from '@nestjs/swagger';

import { Movie } from '@/movies/entities/movie.entity';

class MatchedFields {
  @ApiProperty({
    description: 'title 매칭 여부',
    example: false,
  })
  title: boolean;

  @ApiProperty({
    description: 'alternativeTitle 매칭 여부',
  })
  alternativeTitle: boolean;

  @ApiProperty({
    description: 'rights 매칭 여부',
  })
  rights: boolean;
}
export class SearchMovieResponseDto extends OmitType(Movie, [
  'titleJamo',
  'rightsJamo',
] as const) {
  @ApiProperty({ type: MatchedFields })
  matchedFields: MatchedFields;
}
