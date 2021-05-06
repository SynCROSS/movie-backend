import { config } from 'dotenv';
import { isValidTarget, isValidMedia } from './isValid';
config();

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

export const generateMovieOrSeriesURL = (
  media: string,
  target: string | number,
  info_type: string = '',
): string => {
  if (isValidMedia(media) && isValidTarget(target)) {
    let query = '';

    query = `/${target}`;

    if (!!info_type) {
      query += `/${info_type}`;
    }

    return `${API_URL}/${media}` + query + `?api_key=${API_KEY}`;
  }
  return null;
};

export const generateTrendingURL = (
  media: string,
  time_window: string,
): string => {
  if (
    isValidMedia(media) &&
    !(time_window !== 'week' && time_window !== 'day')
  ) {
    return `${API_URL}/trending/${media}/${time_window}?api_key=${API_KEY}`;
  }
  return null;
};

export const generateGenreURL = (media: string): string => {
  if (isValidMedia(media)) {
    return `${API_URL}/genre/${media}/list?api_key=${API_KEY}`;
  }
  return null;
};

export const generateWatchProvider = (media: string, id: number): string => {
  if (isValidMedia(media) && isValidTarget(id)) {
    return `${API_URL}/${media}/${id}/watch/providers?api_key=${API_KEY}`;
  }
  return null;
};
