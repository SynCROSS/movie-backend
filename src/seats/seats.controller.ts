import { Controller, Get, Param } from '@nestjs/common';
import { SeatsService } from './seats.service';

@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Get('theater/:id')
  async getSeatsByTheaterID(@Param('id') id: number) {
    return await this.seatsService.getSeatsByTheaterID(id);
  }

  @Get('user/:username')
  async getBookedSeatsByUsername(@Param('username') username: string) {
    return await this.seatsService.getBookedSeatsByUsername(username);
  }
}
