export const isValidMedia = (media: string): boolean => {
  if (!/movie|tv/.exec(media)) {
    return false;
  }
  return true;
};

export const isValidTarget = (target: string | number): boolean => {
  if (!/\d+|top_rated|popular|upcoming/i.exec(`${target}`)) {
    return false;
  }

  return true;
};

export const isValidTimeWindow = (time_window: string): boolean => {
  if (!/week|day/.exec(time_window)) {
    return false;
  }
  return true;
};

export const isValidInfoType = (info_type: string): boolean => {
  if (!/recommendations|reviews|similar/.exec(info_type)) {
    return false;
  }
  return true;
};

export const isValidID = (id: number): boolean => {
  if (!/\d+/.exec(`${id}`)) {
    return false;
  }
  return true;
};
