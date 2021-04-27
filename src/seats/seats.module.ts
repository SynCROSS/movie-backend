import { Module } from '@nestjs/common';
import { SeatsController } from './seats.controller';
import { SeatsService } from './seats.service';
import { UsersModule } from '../users/users.module';
import { TheatersModule } from '../theaters/theaters.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from '../models/theater/seat.entity';

@Module({
  imports: [UsersModule, TheatersModule, TypeOrmModule.forFeature([Seat])],
  controllers: [SeatsController],
  providers: [SeatsService],
})
export class SeatsModule {}
