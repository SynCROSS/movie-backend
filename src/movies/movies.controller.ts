import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('api/movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  async getMovies(@Query('target') target: string) {
    return await this.movieService.getMovies(target);
  }

  @Get('trending')
  async getTrending(@Query('time_window') time_window: string) {
    return await this.movieService.getTrending(time_window);
  }

  // @Get('genre')
  // fetchMovieGenres() {
  //   return this.movieService.fetchMovieGenres();
  // }

  @Get('genre/:id')
  async getMovieGenreByID(@Param('id') id: number) {
    return await this.movieService.getMovieGenreByGenreID(id);
  }

  @Get('detail/:id')
  async getMovieDetail(@Param('id') id: number) {
    return await this.movieService.getMovieDetail(id);
  }

  @Get('provider/:id')
  async getWatchProviderByID(@Param('id') id: number) {
    return await this.movieService.getWatchProviderByID(id);
  }

  @Get('info/:id')
  async getMovieOtherInfo(
    @Param('id') id: number,
    @Query('info_type') info_type: string,
  ) {
    return await this.movieService.getMovieOtherInfo(id, info_type);
  }
}
