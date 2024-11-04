import {bela} from '../api';

export const getUserData = async id => {
  const res = await bela(`/account/api/user-detail/${id}/`);
  return res.data;
};
