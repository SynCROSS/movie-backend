import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { isValidID } from '../lib/isValid';
import {
  generatePopularContentsURL,
  generateTopRatedContentsURL,
  generateTrendingContentsURL,
  generateSearchURL,
  generateDetailContentURL,
  generateWatchProvider,
  generateRecommendationsURL,
  generateReviewsURL,
  generateSimilarURL,
  // generateGenresURL
} from 'src/lib/generateURL';
import { Repository } from 'typeorm';
import { TVGenre } from '../models/tv/tv_genre.entity';

@Injectable()
export class TvService {
  constructor(
    @InjectRepository(TVGenre)
    private readonly tvGenreRepository: Repository<TVGenre>,
  ) {}

  async getPopularTVShows(page = 1) {
    try {
      if (!/\d+/.exec(`${+page}`)) {
        return null;
      }

      const { data } = await axios.get(
        generatePopularContentsURL('tv') + `&page=${+page}`,
      );

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getTopRatedTVShows(page = 1) {
    try {
      if (!/\d+/.exec(`${+page}`)) {
        return null;
      }

      const { data } = await axios.get(
        generateTopRatedContentsURL('tv') + `&page=${+page}`,
      );

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getTrendingTVShows(time_window: string, page = 1) {
    try {
      if (!/\d+/.exec(`${+page}`)) {
        return null;
      }

      const { data } = await axios.get(
        generateTrendingContentsURL('tv', time_window) + `&page=${+page}`,
      );

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async searchTVShows(query: string, page = 1) {
    try {
      if (!/\d+/.exec(`${+page}`)) {
        return null;
      }

      const { data } = await axios.get(
        generateSearchURL('tv', query) + `&page=${+page}`,
      );

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getTVShowDetailByID(id: number) {
    try {
      if (!isValidID(+id)) {
        return null;
      }

      const { data } = await axios.get(generateDetailContentURL('tv', +id));

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getKoreanTVShowProviderByID(id: number) {
    try {
      if (!isValidID(+id)) {
        return null;
      }

      const {
        data: { results },
      } = await axios.get(generateWatchProvider('tv', +id));

      return results.KR;
    } catch (e) {
      console.error(e);
    }
  }

  async getTVShowRecommendationsByID(id: number) {
    try {
      if (!isValidID(+id)) {
        return null;
      }

      const {
        data: { results },
      } = await axios.get(generateRecommendationsURL('tv', +id));

      return results;
    } catch (e) {
      console.error(e);
    }
  }

  async getTVShowReviewsByID(id: number) {
    try {
      if (!isValidID(+id)) {
        return null;
      }

      const {
        data: { results },
      } = await axios.get(generateReviewsURL('tv', +id));

      return results;
    } catch (e) {
      console.error(e);
    }
  }
  async getSimilarTVShowByID(id: number) {
    try {
      if (!isValidID(+id)) {
        return null;
      }

      const {
        data: { results },
      } = await axios.get(generateSimilarURL('tv', +id));

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
      if (!isValidID(+id)) {
        return null;
      }

      return await this.tvGenreRepository.findOne({ id });
    } catch (e) {
      console.error(e);
    }
  }
}
