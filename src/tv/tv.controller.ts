import { Controller, Get, Param, Query } from '@nestjs/common';
import { TvService } from './tv.service';

@Controller('api/tv')
export class TvController {
  constructor(private readonly tvService: TvService) {}

  @Get()
  async getTVShows(@Query('target') target: string) {
    return await this.tvService.getTVShows(target);
  }

  @Get('trending')
  async getTrending(@Query('time_window') time_window: string) {
    return await this.tvService.getTrending(time_window);
  }

  // @Get('genre')
  // fetchTVShowGenres() {
  //   return this.tvService.fetchTVShowGenres();
  // }

  @Get('genre/:id')
  async getTVShowGenreByID(@Param('id') id: number) {
    return await this.tvService.getTVShowGenreByID(id);
  }

  @Get('detail/:id')
  async getTVShowsDetail(@Param('id') id: number) {
    return await this.tvService.getTVShowDetail(id);
  }

  @Get('info/:id')
  async getTVShowsOtherInfo(
    @Param('id') id: number,
    @Query('info_type') info_type: string,
  ) {
    return await this.tvService.getTVShowOtherInfo(id, info_type);
  }
}
