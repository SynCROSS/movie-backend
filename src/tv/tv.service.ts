import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  generateMovieOrSeriesURL,
  generateTrendingURL,
} from 'src/lib/generateURL';
import { isValidInfoType, isValidTarget } from '../lib/isValid';

@Injectable()
export class TvService {
  constructor() {}

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
}
