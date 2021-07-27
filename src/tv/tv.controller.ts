import { Controller, Get, Param, Query } from '@nestjs/common';
import { TvService } from './tv.service';

@Controller('api/tv')
export class TvController {
  constructor(private readonly tvService: TvService) {}

  @Get('popular')
  async getPopularTVShows(@Query('page') page: number) {
    return await this.tvService.getPopularTVShows(page);
  }

  @Get('top_rated')
  async getTopRatedTVShows(@Query('page') page: number) {
    return await this.tvService.getTopRatedTVShows(page);
  }

  @Get('trending')
  async getTrendingTVShows(
    @Query('time_window') time_window: string,
    @Query('page') page: number,
  ) {
    return await this.tvService.getTrendingTVShows(time_window, page);
  }

  @Get('search')
  async searchTVShows(
    @Query('query') query: string,
    @Query('page') page: number,
  ) {
    return await this.tvService.searchTVShows(query, page);
  }

  // @Get('genre')
  // fetchTVShowGenres() {
  //   return this.tvService.fetchTVShowGenres();
  // }

  @Get('detail/:id')
  async getTVShowDetailByID(@Param('id') id: number) {
    return await this.tvService.getTVShowDetailByID(id);
  }

  @Get('provider/:id')
  async getKoreanMovieProviderByID(@Param('id') id: number) {
    return await this.tvService.getKoreanTVShowProviderByID(id);
  }

  @Get('recommendations/:id')
  async getTVShowRecommendationsByID(@Param('id') id: number) {
    return await this.tvService.getTVShowRecommendationsByID(id);
  }

  @Get('reviews/:id')
  async getTVShowReviewsByID(@Param('id') id: number) {
    return await this.tvService.getTVShowReviewsByID(id);
  }

  @Get('similar/:id')
  async getSimilarTVShowByID(@Param('id') id: number) {
    return await this.tvService.getSimilarTVShowByID(id);
  }
}
