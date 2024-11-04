import {bela} from '../api';

export const getSliderData = async () => {
  const res = await bela('/api/slider-list/');
  return res.data;
};
