import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('api/movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get('popular')
  async getPopularMovies(@Query('page') page: number = 1) {
    return await this.movieService.getPopularMovies(page);
  }

  @Get('top_rated')
  async getTopRatedMovies(@Query('page') page: number = 1) {
    return await this.movieService.getTopRatedMovies(page);
  }

  @Get('trending')
  async getTrendingMovies(
    @Query('time_window') time_window: string,
    @Query('page') page: number = 1,
  ) {
    return await this.movieService.getTrendingMovies(time_window, page);
  }

  @Get('search')
  async searchMovies(
    @Query('query') query: string,
    @Query('page') page: number = 1,
  ) {
    return await this.movieService.searchMovies(query, page);
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
  async getKoreanWatchProviderByID(@Param('id') id: number) {
    return await this.movieService.getKoreanWatchProviderByID(id);
  }

  @Get('recommendations/:id')
  async getMovieRecommendations(@Param('id') id: number) {
    return await this.movieService.getMovieRecommendations(id);
  }

  @Get('reviews/:id')
  async getMovieReviews(@Param('id') id: number) {
    return await this.movieService.getMovieReviews(id);
  }

  @Get('similar/:id')
  async getMovieSimilar(@Param('id') id: number) {
    return await this.movieService.getMovieSimilar(id);
  }
}
