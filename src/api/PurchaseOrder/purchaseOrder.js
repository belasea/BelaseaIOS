import {bela} from '../api';

export const getPurchaseOrderData = async number => {
  const res = await bela(`/api/purchase-order-list/${number}/`);
  return res?.data;
};
