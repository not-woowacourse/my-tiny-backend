import { Movie } from '@/movies/entities/movie.entity';

/**
 * @note
 * 아직 검색용 테이블을 분리한 상태가 아닙니다. 검색 시 오는 객체와 상세 조회 시 오는 객체가 동일합니다.
 */
export class SearchMovieResponseDto extends Movie {}
