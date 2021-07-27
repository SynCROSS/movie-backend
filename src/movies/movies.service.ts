import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { isValidID } from 'src/lib/isValid';
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
} from '../lib/generateURL';
import { Repository } from 'typeorm';
import { MovieGenre } from '../models/movie/movie_genre.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieGenre)
    private readonly movieGenreRepository: Repository<MovieGenre>,
  ) {}

  async getPopularMovies(page = 1) {
    try {
      if (!/\d+/.exec(`${+page}`)) {
        return null;
      }

      const { data } = await axios.get(
        generatePopularContentsURL('movie') + `&page=${+page}`,
      );

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getTopRatedMovies(page = 1) {
    try {
      if (!/\d+/.exec(`${+page}`)) {
        return null;
      }

      const { data } = await axios.get(
        generateTopRatedContentsURL('movie') + `&page=${+page}`,
      );

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getTrendingMovies(time_window: string, page = 1) {
    try {
      if (!/\d+/.exec(`${+page}`)) {
        return null;
      }

      const { data } = await axios.get(
        generateTrendingContentsURL('movie', time_window) + `&page=${+page}`,
      );

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async searchMovies(query: string, page = 1) {
    try {
      if (!/\d+/.exec(`${+page}`)) {
        return null;
      }

      const { data } = await axios.get(
        generateSearchURL('movie', query) + `&page=${+page}`,
      );

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getMovieDetailByID(id: number) {
    try {
      if (!isValidID(+id)) {
        return null;
      }

      const { data } = await axios.get(generateDetailContentURL('movie', +id));

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getKoreanMovieProviderByID(id: number) {
    try {
      if (!isValidID(+id)) {
        return null;
      }

      const {
        data: { results },
      } = await axios.get(generateWatchProvider('movie', +id));

      return results.KR;
    } catch (e) {
      console.error(e);
    }
  }

  async getMovieRecommendationsByID(id: number) {
    try {
      if (!isValidID(+id)) {
        return null;
      }

      const {
        data: { results },
      } = await axios.get(generateRecommendationsURL('movie', +id));

      return results;
    } catch (e) {
      console.error(e);
    }
  }

  async getMovieReviewsByID(id: number) {
    try {
      if (!isValidID(+id)) {
        return null;
      }

      const {
        data: { results },
      } = await axios.get(generateReviewsURL('movie', +id));

      return results;
    } catch (e) {
      console.error(e);
    }
  }
  async getSimilarMovieByID(id: number) {
    try {
      if (!isValidID(+id)) {
        return null;
      }

      const {
        data: { results },
      } = await axios.get(generateSimilarURL('movie', +id));

      return results;
    } catch (e) {
      console.error(e);
    }
  }

  // async fetchMovieGenres() {
  //   try {
  //     const {
  //       data: { genres },
  //     } = await axios.get(generateGenresURL('movie'));

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
      if (!isValidID(+id)) {
        return null;
      }

      return await this.movieGenreRepository.findOne({ id });
    } catch (e) {
      console.error(e);
    }
  }
}
