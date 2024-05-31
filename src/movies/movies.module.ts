import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientsModule } from '@/clients/clients.module';
import { Movie } from '@/movies/entities/movie.entity';

import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), ClientsModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
