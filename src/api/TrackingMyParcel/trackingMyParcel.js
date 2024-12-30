import {bela} from '../api';

export const getTrackingMyParcelListData = async number => {
  const res = await bela(`/api/tracking-parcel-list/${number}`);
  return res?.data;
};
