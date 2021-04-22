import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TvController } from './tv.controller';
import { TvService } from './tv.service';
import { TV } from '../models/tv/tv.entity';
import { TVGenre } from '../models/tv/tv_genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TV, TVGenre])],
  controllers: [TvController],
  providers: [TvService],
})
export class TvModule {}
