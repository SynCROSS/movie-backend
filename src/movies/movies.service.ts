import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { isValidTarget, isValidInfoType } from 'src/lib/isValid';
import {
  generateMovieOrSeriesURL,
  generateTrendingURL,
} from '../lib/generateURL';

@Injectable()
export class MoviesService {
  constructor() {}

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
      if (typeof id !== 'number') {
        return null;
      }

      const { data } = await axios.get(generateMovieOrSeriesURL('movie', id));
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getMovieOtherInfo(id: number, info_type: string) {
    try {
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
}
