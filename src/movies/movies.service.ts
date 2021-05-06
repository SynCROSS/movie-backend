import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { isValidTarget, isValidInfoType } from 'src/lib/isValid';
import {
  generateMovieOrSeriesURL,
  generateTrendingURL,
  // generateGenreURL
} from '../lib/generateURL';
import { Repository } from 'typeorm';
import { MovieGenre } from '../models/movie/movie_genre.entity';
import { generateWatchProvider } from '../lib/generateURL';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieGenre)
    private readonly movieGenreRepository: Repository<MovieGenre>,
  ) {}

  async getMovies(target: string) {
    try {
      if (!target && isValidTarget(target)) {
        return null;
      }

      const {
        data: { results },
      } = await axios.get(generateMovieOrSeriesURL('movie', target));

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
      } = await axios.get(generateTrendingURL('movie', time_window));

      return results;
    } catch (e) {
      console.error(e);
    }
  }

  async getMovieDetail(id: number) {
    try {
      if (isNaN(id) || typeof id !== 'number') {
        return null;
      }

      const { data } = await axios.get(generateMovieOrSeriesURL('movie', id));

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getWatchProviderByID(id: number) {
    try {
      if (isNaN(id) && typeof id !== 'number') {
        return null;
      }

      const {
        data: { results },
      } = await axios.get(generateWatchProvider('movie', id));
      return results.KR;
    } catch (e) {
      console.error(e);
    }
  }

  async getMovieOtherInfo(id: number, info_type: string) {
    try {
      if (isNaN(id) || typeof id !== 'number') {
        return null;
      }

      if (!info_type && isValidInfoType(info_type)) {
        return null;
      }

      const {
        data: { results },
      } = await axios.get(generateMovieOrSeriesURL('movie', id, info_type));

      return results;
    } catch (e) {
      console.error(e);
    }
  }

  // async fetchMovieGenres() {
  //   try {
  //     const {
  //       data: { genres },
  //     } = await axios.get(generateGenreURL('movie'));

  //     for await (const genre of genres) {
  //       await this.movieGenreRepository.save(
  //         this.movieGenreRepository.create({ ...genre }),
  //       );
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  async getMovieGenreByGenreID(id: number) {
    try {
      return await this.movieGenreRepository.findOne({ id });
    } catch (e) {
      console.error(e);
    }
  }
}
