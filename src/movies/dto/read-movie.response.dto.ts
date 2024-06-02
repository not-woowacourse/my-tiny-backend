import { OmitType } from '@nestjs/swagger';

import { Movie } from '@/movies/entities/movie.entity';

export class ReadMovieResponseDto extends OmitType(Movie, [
  'titleJamo',
  'rightsJamo',
] as const) {}
