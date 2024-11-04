import {bela} from '../api';

export const getMakeupData = async () => {
  const res = await bela('/api/makeup-categories/');
  return res.data;
};
