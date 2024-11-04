import {bela} from '../api';

export const getTrackingMyParcelListData = async mobile_no => {
  const res = await bela(`/api/tracking-parcel-list/${mobile_no}`);
  return res.data;
};
