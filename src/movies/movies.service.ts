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
    const EXCEPTIONAL_DICT = {
      /* 이중모음 (11개) */
      ㅐ: 'ㅏㅣ',
      ㅔ: 'ㅓㅣ',
      ㅖ: 'ㅕㅣ',
      ㅘ: 'ㅗㅏ',
      ㅙ: 'ㅗㅐ',
      ㅚ: 'ㅗㅣ',
      ㅝ: 'ㅜㅓ',
      ㅞ: 'ㅜㅔ',
      ㅟ: 'ㅜㅣ',
      ㅢ: 'ㅡㅣ',
      /* 겹자음 (5개) */
      ㄲ: 'ㄱㄱ',
      ㄸ: 'ㄷㄷ',
      ㅃ: 'ㅂㅂ',
      ㅆ: 'ㅅㅅ',
      ㅉ: 'ㅈㅈ',
      /* 겹받침 (11개) */
      ㄳ: 'ㄱㅅ',
      ㄵ: 'ㄴㅈ',
      ㄶ: 'ㄴㅎ',
      ㄺ: 'ㄹㄱ',
      ㄻ: 'ㄹㅁ',
      ㄼ: 'ㄹㅂ',
      ㄽ: 'ㄹㅅ',
      ㄾ: 'ㄹㅌ',
      ㄿ: 'ㄹㅍ',
      ㅀ: 'ㄹㅎ',
      ㅄ: 'ㅂㅅ',
    } as const;

    const disassembledQuery = disassembleHangul(query).replace(
      /./g,
      (char) => EXCEPTIONAL_DICT[char] || char,
    );

    const titleJamoMatches = await this.movieRepository.find({
      where: { titleJamo: ILike(`%${disassembledQuery}%`) },
      take: limit,
    });

    const alternativeTitleMatches = await this.movieRepository.find({
      where: { alternativeTitle: ILike(`%${query}%`) },
      take: limit,
    });

    const rightsJamoMatches = await this.movieRepository.find({
      where: { rightsJamo: ILike(`%${disassembledQuery}%`) },
      take: limit,
    });

    const movieMatchMap = new Map();

    // titleJamo 매칭 결과 처리
    for (const movie of titleJamoMatches) {
      if (!movieMatchMap.has(movie.id)) {
        movieMatchMap.set(movie.id, {
          ...movie,
          matchedFields: {
            title: false,
            alternativeTitle: false,
            rights: false,
          },
        });
      }
      movieMatchMap.get(movie.id).matchedFields.title = true;
    }

    // alternativeTitle 매칭 결과 처리
    for (const movie of alternativeTitleMatches) {
      if (!movieMatchMap.has(movie.id)) {
        movieMatchMap.set(movie.id, {
          ...movie,
          matchedFields: {
            title: false,
            alternativeTitle: false,
            rights: false,
          },
        });
      }
      movieMatchMap.get(movie.id).matchedFields.alternativeTitle = true;
    }

    // rightsJamo 매칭 결과 처리
    for (const movie of rightsJamoMatches) {
      if (!movieMatchMap.has(movie.id)) {
        movieMatchMap.set(movie.id, {
          ...movie,
          matchedFields: {
            title: false,
            alternativeTitle: false,
            rights: false,
          },
        });
      }
      movieMatchMap.get(movie.id).matchedFields.rights = true;
    }

    // 결과 배열 생성 및 titleJamo, rightsJamo 속성 제거
    const results = Array.from(movieMatchMap.values()).map(
      ({ titleJamo, rightsJamo, ...rest }) => rest,
    );

    return results;
  }

  async findOne(id: number) {
    const movie = await this.movieRepository.findOneBy({ id });

    if (movie === null) {
      throw new NotFoundException('영화를 찾을 수 없습니다.');
    }

    const { titleJamo, rightsJamo, ...rest } = movie;

    return rest;
  }
}
