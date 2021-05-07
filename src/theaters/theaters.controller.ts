import { Controller, Get, Param } from '@nestjs/common';
import { TheatersService } from './theaters.service';

@Controller('api/theaters')
export class TheatersController {
  constructor(private readonly theatersService: TheatersService) {}

  @Get()
  async getAllTheaters() {
    return await this.theatersService.getAllTheaters();
  }

  @Get(':id')
  async getTheaterByID(@Param('id') id: number) {
    return await this.theatersService.getTheaterByID(id);
  }
}
