import {bela} from '../api';

// export const getBrandData = async () => {
//   const res = await bela('/products/api/brand/');
//   return res.data;
// };

// Updated function to accept a page parameter
export const getBrandData = async (page = 1) => {
  const res = await bela(`/products/api/all-brand-list/?page=${page}`);
  return res?.data;
};
