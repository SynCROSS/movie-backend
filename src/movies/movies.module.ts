import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
// import { Movie } from '../models/movie/movie.entity';
import { MovieGenre } from '../models/movie/movie_genre.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // Movie,
      MovieGenre,
    ]),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
