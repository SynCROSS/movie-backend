export const isValidMedia = (media: string): boolean => {
  if (media !== 'movie' && media !== 'tv') {
    return false;
  }
  return true;
};

export const isValidTarget = (target: string | number): boolean => {
  if (
    target !== 'top_rated' &&
    target !== 'popular' &&
    target !== 'upcoming' &&
    typeof target !== 'number'
  ) {
    return false;
  }

  if (typeof target === 'number' && isNaN(target)) {
    return false;
  }

  return true;
};

export const isValidInfoType = (info_type: string): boolean => {
  if (
    info_type !== 'recommendations' &&
    info_type !== 'reviews' &&
    info_type !== 'similar'
  ) {
    return false;
  }
  return true;
};
