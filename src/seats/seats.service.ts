import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from '../models/theater/seat.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { TheatersService } from '../theaters/theaters.service';
import { SeatDTO } from './seat.dto';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat) private readonly seatRepository: Repository<Seat>,
    private readonly userService: UsersService,
    private readonly theatersService: TheatersService,
  ) {}

  async getSeatsByTheaterID(id: number) {
    try {
      const theater = await this.theatersService.getTheaterByID(id);

      if (!theater) {
        return null;
      }

      return await this.seatRepository.find({ theater });
    } catch (e) {
      console.error(e);
    }
  }

  async getBookedSeatsByUsername(username: string) {
    try {
      const user = await this.userService.getUserByUsername(username);

      if (!user) {
        return null;
      }

      return await this.seatRepository.find({ user });
    } catch (e) {
      console.error(e);
    }
  }

  async bookSeats(bookingInfo: SeatDTO) {
    const { theaterID, username, ...seatInfo } = bookingInfo;

    try {
      const theater = await this.theatersService.getTheaterByID(theaterID);
      const user = await this.userService.getUserByUsername(username);

      if (!theater) {
        return false;
      }

      if (!user) {
        return false;
      }

      if (seatInfo.seatNumbers.length === seatInfo.seatCount) {
        for await (const seatNumber of seatInfo.seatNumbers) {
          await this.seatRepository.save(
            this.seatRepository.create({
              theater,
              user,
              seatNumber,
            }),
          );
        }
      }
      return true;
    } catch (e) {
      console.error(e);
    }
  }

  async cancelSeats(cancelInfo: SeatDTO) {
    const { theaterID, username, ...seatInfo } = cancelInfo;

    try {
      const theater = await this.theatersService.getTheaterByID(theaterID);
      const user = await this.userService.getUserByUsername(username);

      if (!theater) {
        return false;
      }

      if (!user) {
        return false;
      }

      if (seatInfo.seatNumbers.length === seatInfo.seatCount) {
        return await this.seatRepository.delete({ user, theater });
      }
    } catch (e) {
      console.error(e);
    }
  }
}
