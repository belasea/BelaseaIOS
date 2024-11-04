import {bela} from '../api';

export const getSkinData = async () => {
  const res = await bela('/api/skin-categories/');
  return res.data;
};
