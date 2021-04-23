import { Controller, Get, Param, Query } from '@nestjs/common';
import { TvService } from './tv.service';

@Controller('tv')
export class TvController {
  constructor(private readonly tvService: TvService) {}

  @Get()
  getTVShows(@Query('target') target: string) {
    return this.tvService.getTVShows(target);
  }

  @Get('trending')
  getTrending(@Query('time_window') time_window: string) {
    return this.tvService.getTrending(time_window);
  }

  // @Get('genre')
  // fetchTVShowGenres() {
  //   return this.tvService.fetchTVShowGenres();
  // }

  @Get('genre/:id')
  getTVShowGenreByID(@Param('id') id: number) {
    return this.tvService.getTVShowGenreByID(id);
  }

  @Get('detail/:id')
  getTVShowsDetail(@Param('id') id: number) {
    return this.tvService.getTVShowDetail(id);
  }

  @Get('info/:id')
  getTVShowsOtherInfo(
    @Param('id') id: number,
    @Query('info_type') info_type: string,
  ) {
    return this.tvService.getTVShowOtherInfo(id, info_type);
  }
}
