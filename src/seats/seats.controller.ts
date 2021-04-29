import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatDTO } from './seat.dto';

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

  @Post('book')
  async bookSeats(@Body() bookingInfo: SeatDTO) {
    return await this.seatsService.bookSeats(bookingInfo);
  }

  @Post('cancel')
  async cancelSeats(@Body() cancelInfo: SeatDTO) {
    return await this.seatsService.cancelSeats(cancelInfo);
  }
}
