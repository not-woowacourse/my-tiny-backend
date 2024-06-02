import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * @note
 * preprocess.py 에서 생성한 영화 데이터를 저장하는 엔티티
 */
@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @ApiProperty({ description: '영화 ID', example: 1 })
  id: number;

  @Column()
  @ApiProperty({ description: '영화 제목', example: '기생충' })
  title: string;

  @Column()
  @ApiProperty({
    description: '영화 제목 (자모 분리)',
    example: 'ㄱㅣㅅㅐㅇㅊㅜㅇ',
  })
  titleJamo: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({ description: '대체 제목', example: 'PARASITE' })
  alternativeTitle: string;

  @Column()
  @ApiProperty({
    description: 'UCI 코드',
    example: 'G706+KOBIS04-MV.list.0020183782',
  })
  uci: string;

  @Column()
  @ApiProperty({
    description: '상세 정보 URL',
    example:
      'http://www.kobis.or.kr/kobis/business/mast/mvie/searchMovieList.do?sMovName=기생충&dtTp=movie&dtCd=20183782',
  })
  url: string;

  @Column('integer', { nullable: true })
  @ApiPropertyOptional({ description: '생성 년도', example: 2019 })
  year: number;

  @Column({ nullable: true })
  @ApiPropertyOptional({ description: '제작 지역', example: '한국,미국' })
  region: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({ description: '카테고리', example: '드라마,코미디' })
  category: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({ description: '권리 주체', example: '봉준호' })
  rights: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({
    description: '권리 주체 (자모 분리)',
    example: 'ㅂㅗㅇㅈㅜㄴㅎㅗ',
  })
  rightsJamo: string;
}
