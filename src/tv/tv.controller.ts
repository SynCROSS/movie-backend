import { Controller, Get, Param, Query } from '@nestjs/common';
import { TvService } from './tv.service';

@Controller('tv')
export class TvController {
  constructor(private readonly tvService: TvService) {}

  @Get()
  getMovies(@Query('target') target: string) {
    return this.tvService.getTVShows(target);
  }

  @Get('trending')
  getTrending(@Query('time_window') time_window: string) {
    return this.tvService.getTrending(time_window);
  }

  @Get('detail/:id')
  getMovieDetail(@Param('id') id: number) {
    return this.tvService.getTVShowDetail(id);
  }

  @Get('info/:id')
  getMovieOtherInfo(
    @Param('id') id: number,
    @Query('info_type') info_type: string,
  ) {
    return this.tvService.getTVShowOtherInfo(id, info_type);
  }
}
