import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ClientGuard } from '@/auth/client.guard';
import { ReadMovieResponseDto } from '@/movies/dto/read-movie.response.dto';
import { SearchMovieResponseDto } from '@/movies/dto/search-movie.response.dto';
import { CLIENT_NAME_KEY } from '@/shared/constants/http-header';
import { ClientNameInterceptor } from '@/shared/interceptors/client-name.interceptor';

import { MoviesService } from './movies.service';

@UseGuards(ClientGuard)
@UseInterceptors(ClientNameInterceptor)
@Controller('movies')
@ApiTags('3.1. Movies')
@ApiHeader({
  name: CLIENT_NAME_KEY,
  description: '클라이언트 이름',
  required: true,
})
@ApiUnauthorizedResponse({
  description: '클라이언트를 찾을 수 없음',
})
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  @ApiOperation({
    summary: '영화 검색',
  })
  @ApiQuery({
    name: 'query',
    description: '검색어',
  })
  @ApiQuery({
    name: 'limit',
    description: '검색 개수 제한 (기본값 10개)',
    required: false,
  })
  @ApiOkResponse({
    description: '성공',
    type: SearchMovieResponseDto,
    isArray: true,
  })
  search(@Query('query') query: string, @Query('limit') limit: number = 10) {
    return this.moviesService.search(query, limit);
  }

  @Get('detail/:id')
  @ApiOperation({
    summary: '영화 상세 조회',
  })
  @ApiParam({
    name: 'id',
    description: '영화 ID',
  })
  @ApiOkResponse({
    description: '성공',
    type: ReadMovieResponseDto,
  })
  @ApiNotFoundResponse({
    description: '영화를 찾을 수 없음',
  })
  findOne(@Param('id') id: number) {
    return this.moviesService.findOne(id);
  }
}
