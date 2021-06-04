export const isValidMedia = (media: string): boolean => {
  return !!/movie|tv/.exec(media);
};

export const isValidCategory = (category: string): boolean => {
  return !!/top_rated|popular|upcoming/i.exec(category);
};

export const isValidTimeWindow = (time_window: string): boolean => {
  return !!/week|day/.exec(time_window);
};

export const isValidID = (id: number): boolean => {
  return !!/\d+/.exec(`${id}`);
};

export const isValidInfoType = (info_type: string): boolean => {
  return !!/recommendations|reviews|similar/.exec(info_type);
};
