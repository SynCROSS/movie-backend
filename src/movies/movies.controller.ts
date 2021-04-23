import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  getMovies(@Query('target') target: string) {
    return this.movieService.getMovies(target);
  }

  @Get('trending')
  getTrending(@Query('time_window') time_window: string) {
    return this.movieService.getTrending(time_window);
  }

  // @Get('genre')
  // fetchMovieGenres() {
  //   return this.movieService.fetchMovieGenres();
  // }

  @Get('genre/:id')
  getMovieGenreByID(@Param('id') id: number) {
    return this.movieService.getMovieGenreByID(id);
  }

  @Get('detail/:id')
  getMovieDetail(@Param('id') id: number) {
    return this.movieService.getMovieDetail(id);
  }

  @Get('info/:id')
  getMovieOtherInfo(
    @Param('id') id: number,
    @Query('info_type') info_type: string,
  ) {
    return this.movieService.getMovieOtherInfo(id, info_type);
  }
}
