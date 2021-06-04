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
  async getMovieDetailByID(@Param('id') id: number) {
    return await this.movieService.getMovieDetailByID(id);
  }

  @Get('provider/:id')
  async getKoreanMovieProviderByID(@Param('id') id: number) {
    return await this.movieService.getKoreanMovieProviderByID(id);
  }

  @Get('recommendations/:id')
  async getMovieRecommendationsByID(@Param('id') id: number) {
    return await this.movieService.getMovieRecommendationsByID(id);
  }

  @Get('reviews/:id')
  async getMovieReviewsByID(@Param('id') id: number) {
    return await this.movieService.getMovieReviewsByID(id);
  }

  @Get('similar/:id')
  async getSimilarMovieByID(@Param('id') id: number) {
    return await this.movieService.getSimilarMovieByID(id);
  }
}
