import { config } from 'dotenv';
import { isValidInfoType } from './isValid';
import {
  isValidCategory,
  isValidMedia,
  isValidTimeWindow,
  isValidID,
} from './isValid';
config();

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

const generateContentsURL = (media: string, category: string): string => {
  if (!isValidMedia(media) || !isValidCategory(category)) {
    return null;
  }
  return `${API_URL}/${media}/${category}?api_key=${API_KEY}`;
};

export const generatePopularContentsURL = (media: string): string => {
  return generateContentsURL(media, 'popular');
};

export const generateTopRatedContentsURL = (media: string): string => {
  return generateContentsURL(media, 'top_rated');
};

export const generateTrendingContentsURL = (
  media: string,
  time_window: string,
): string => {
  if (!isValidMedia(media) || !isValidTimeWindow(time_window)) {
    return null;
  }
  return `${API_URL}/trending/${media}/${time_window}?api_key=${API_KEY}`;
};

export const generateDetailContentURL = (media: string, id: number): string => {
  if (!isValidMedia(media) || !isValidID(+id)) {
    return null;
  }
  return `${API_URL}/${media}/${+id}?api_key=${API_KEY}`;
};

export const generateSearchURL = (media: string, query: string): string => {
  if (!isValidMedia(media) || !/.+/.exec(query)) {
    return null;
  }
  return `${API_URL}/search/${media}?api_key=${API_KEY}&query=${query}`;
};

export const generateWatchProvider = (media: string, id: number): string => {
  if (!isValidMedia(media) || !isValidID(+id)) {
    return null;
  }
  return `${API_URL}/${media}/${+id}/watch/providers?api_key=${API_KEY}`;
};

const generateInfoURL = (
  media: string,
  id: number,
  info_type: string,
): string => {
  if (!isValidMedia(media) || !isValidID(+id) || !isValidInfoType(info_type)) {
    return null;
  }
  return `${API_URL}/${media}/${+id}/${info_type}?api_key=${API_KEY}`;
};

export const generateRecommendationsURL = (
  media: string,
  id: number,
): string => {
  return generateInfoURL(media, id, 'recommendations');
};

export const generateReviewsURL = (media: string, id: number): string => {
  return generateInfoURL(media, id, 'reviews');
};

export const generateSimilarURL = (media: string, id: number): string => {
  return generateInfoURL(media, id, 'similar');
};

export const generateGenresURL = (media: string): string => {
  if (!isValidMedia(media)) {
    return null;
  }
  return `${API_URL}/genre/${media}/list?api_key=${API_KEY}`;
};
