import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { disassembleHangul } from 'es-hangul';
import { ILike, Repository } from 'typeorm';

import { Movie } from '@/movies/entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async search(query: string, limit: number) {
    const disassembledQuery = disassembleHangul(query);

    const movies = await this.movieRepository.find({
      where: [
        { titleJamo: ILike(`%${disassembledQuery}%`) },
        { alternativeTitle: ILike(`%${query}%`) },
        { rightsJamo: ILike(`%${disassembledQuery}%`) },
      ],
      take: limit,
    });

    return movies.map((movie) => {
      const { titleJamo, rightsJamo, ...rest } = movie;
      return rest;
    });
  }

  async findOne(id: number) {
    const movie = await this.movieRepository.findOneBy({ id });

    if (movie === null) {
      throw new NotFoundException('영화를 찾을 수 없습니다.');
    }

    return movie;
  }
}
