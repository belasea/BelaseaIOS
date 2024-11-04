import {bela} from '../api';

export const getLiveOffer = async user_id => {
  const res = await bela(`/api/live-offer-with-comment-list/${user_id}/`);
  return res.data;
};
