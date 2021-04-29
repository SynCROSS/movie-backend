import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import {
  // generateGenreURL,
  generateMovieOrSeriesURL,
  generateTrendingURL,
} from 'src/lib/generateURL';
import { isValidInfoType, isValidTarget } from '../lib/isValid';
import { TVGenre } from '../models/tv/tv_genre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TvService {
  constructor(
    @InjectRepository(TVGenre)
    private readonly tvGenreRepository: Repository<TVGenre>,
  ) {}

  async getTVShows(target: string) {
    try {
      if (!target && isValidTarget(target)) {
        return null;
      }

      const {
        data: { results },
      } = await axios.get(generateMovieOrSeriesURL('tv', target));

      return results;
    } catch (e) {
      console.error(e);
    }
  }

  async getTrending(time_window: string) {
    try {
      if (!time_window) {
        return null;
      }

      const {
        data: { results },
      } = await axios.get(generateTrendingURL('tv', time_window));

      return results;
    } catch (e) {
      console.error(e);
    }
  }

  async getTVShowDetail(id: number) {
    try {
      if (typeof id !== 'number') {
        return null;
      }

      const { data } = await axios.get(generateMovieOrSeriesURL('tv', id));

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getTVShowOtherInfo(id: number, info_type: string) {
    try {
      if (!info_type && isValidInfoType(info_type)) {
        return null;
      }

      const {
        data: { results },
      } = await axios.get(generateMovieOrSeriesURL('tv', id, info_type));

      return results;
    } catch (e) {
      console.error(e);
    }
  }

  // async fetchTVShowGenres() {
  //   try {
  //     const {
  //       data: { genres },
  //     } = await axios.get(generateGenreURL('tv'));

  //     for await (const genre of genres) {
  //       await this.tvGenreRepository.save(
  //         this.tvGenreRepository.create({ ...genre }),
  //       );
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  async getTVShowGenreByID(id: number) {
    try {
      return await this.tvGenreRepository.findOne({ id });
    } catch (e) {
      console.error(e);
    }
  }
}
