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
    return await this.theaterRepository.find();
  }

  async getTheaterByID(id: number) {
    return await this.theaterRepository.findOne({ id });
  }
}
