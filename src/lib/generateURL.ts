import { config } from 'dotenv';
import { isValidTarget, isValidMedia, isValidTimeWindow } from './isValid';
config();

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

export const generateContentsURL = (
  media: string,
  target: string | number,
  info_type: string = '',
): string => {
  if (isValidMedia(media) && isValidTarget(target)) {
    let query = `/${target}`;

    if (!!info_type) {
      query += `/${info_type}`;
    }

    return `${API_URL}/${media}` + query + `?api_key=${API_KEY}`;
  }
  return null;
};

export const generateSearchURL = (media: string, query: string): string => {
  if (!isValidMedia(media)) return null;
  if (!query) return null;

  return `${API_URL}/search/${media}?api_key=${API_KEY}&query=${query}`;
};

export const generateTrendingURL = (
  media: string,
  time_window: string,
): string => {
  if (!isValidMedia(media)) return null;
  if (!isValidTimeWindow(time_window)) return null;

  return `${API_URL}/trending/${media}/${time_window}?api_key=${API_KEY}`;
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
