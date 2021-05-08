import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import {
  // generateGenreURL,
  generateContentsURL,
  generateSearchURL,
  generateTrendingURL,
} from 'src/lib/generateURL';
import { isValidID, isValidInfoType, isValidTarget } from '../lib/isValid';
import { TVGenre } from '../models/tv/tv_genre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TvService {
  constructor(
    @InjectRepository(TVGenre)
    private readonly tvGenreRepository: Repository<TVGenre>,
  ) {}

  async getTVShows(target: string, page: number = 1) {
    try {
      if (!isValidTarget(target)) {
        return null;
      }

      const { data } = await axios.get(
        generateContentsURL('tv', target) + `&page=${page || 1}`,
      );

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async searchTVShows(query: string, page: number = 1) {
    try {
      const { data } = await axios.get(
        generateSearchURL('tv', query) + `&page=${page || 1}`,
      );

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getTrending(time_window: string, page: number = 1) {
    try {
      const { data } = await axios.get(
        generateTrendingURL('tv', time_window) + `&page=${page || 1}`,
      );

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getTVShowDetail(id: number) {
    try {
      if (!isValidID(id)) {
        return null;
      }

      const { data } = await axios.get(generateContentsURL('tv', id));

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getTVShowOtherInfo(id: number, info_type: string) {
    try {
      if (!isValidID(id)) {
        return null;
      }

      if (!isValidInfoType(info_type)) {
        return null;
      }

      const {
        data: { results },
      } = await axios.get(generateContentsURL('tv', id, info_type));

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
      if (!isValidID(id)) {
        return null;
      }

      return await this.tvGenreRepository.findOne({ id });
    } catch (e) {
      console.error(e);
    }
  }
}
