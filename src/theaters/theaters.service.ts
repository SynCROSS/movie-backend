import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Theater } from '../models/theater/theater.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TheatersService {
  constructor(
    @InjectRepository(Theater)
    private readonly theaterRepository: Repository<Theater>,
  ) {}

  async getAllTheaters() {
    try {
      return await this.theaterRepository.find();
    } catch (e) {
      console.error(e);
    }
  }

  async getTheaterByID(id: number) {
    try {
      return await this.theaterRepository.findOne({ id });
    } catch (e) {
      console.error(e);
    }
  }
}
