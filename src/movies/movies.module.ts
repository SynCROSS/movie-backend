import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MovieGenre } from '../models/movie/movie_genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieGenre])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
