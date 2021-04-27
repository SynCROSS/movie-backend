import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from '../models/theater/seat.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { TheatersService } from '../theaters/theaters.service';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat) private readonly seatRepository: Repository<Seat>,
    private readonly userService: UsersService,
    private readonly theatersService: TheatersService,
  ) {}

  async getSeatsByTheaterID(id: number) {
    const theater = await this.theatersService.getTheaterByID(id);

    if (!theater) {
      return null;
    }

    return await this.seatRepository.find({ theater });
  }

  async getBookedSeatsByUsername(username: string) {
    const user = await this.userService.getUserByUsername(username);

    if (!user) {
      return null;
    }

    return await this.seatRepository.find({ user });
  }
}
