import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { Movie } from '@/movies/entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async search(query: string, limit: number) {
    /**
     * TODO: 한글 자모 분해 후 검색
     */
    const movies = await this.movieRepository.find({
      where: [
        { title: ILike(`%${query}%`) },
        { alternativeTitle: ILike(`%${query}%`) },
        { rights: ILike(`%${query}%`) },
      ],
      take: limit,
    });

    return movies;
  }

  async findOne(id: number) {
    const movie = await this.movieRepository.findOneBy({ id });

    if (movie === null) {
      throw new NotFoundException('영화를 찾을 수 없습니다.');
    }

    return movie;
  }
}
