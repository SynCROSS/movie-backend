import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { isValidTarget, isValidInfoType, isValidID } from 'src/lib/isValid';
import {
  generateContentsURL,
  generateTrendingURL,
  // generateGenreURL
  generateWatchProvider,
  generateSearchURL,
} from '../lib/generateURL';
import { Repository } from 'typeorm';
import { MovieGenre } from '../models/movie/movie_genre.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieGenre)
    private readonly movieGenreRepository: Repository<MovieGenre>,
  ) {}

  async getMovies(target: string, page: number = 1) {
    try {
      if (!isValidTarget(target)) {
        return null;
      }

      const { data } = await axios.get(
        generateContentsURL('movie', target) + `&page=${page || 1}`,
      );

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async searchMovies(query: string, page: number = 1) {
    try {
      const { data } = await axios.get(
        generateSearchURL('movie', query) + `&page=${page || 1}`,
      );
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getTrending(time_window: string, page: number = 1) {
    try {
      const { data } = await axios.get(
        generateTrendingURL('movie', time_window) + `&page=${page || 1}`,
      );

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getMovieDetail(id: number) {
    try {
      if (!isValidID(id)) {
        return null;
      }

      const { data } = await axios.get(generateContentsURL('movie', id));

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getWatchProviderByID(id: number) {
    try {
      if (!isValidID(id)) {
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
      if (!isValidID(id)) {
        return null;
      }

      if (!isValidInfoType(info_type)) {
        return null;
      }

      const {
        data: { results },
      } = await axios.get(generateContentsURL('movie', id, info_type));

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
