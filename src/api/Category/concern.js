import {bela} from '../api';

export const getConcernData = async () => {
  const res = await bela('/api/concern-categories/');
  return res.data;
};
