import {bela} from '../api';

export const getHotDealsProductsOfferList = async () => {
  let hotDealsProductOfferListJSON = [];
  const res = await bela('/products/api/hot-deals-offer/offer/');

  res.data.results.map(item => {
    let hotDealsProductOfferJson = {
      id: item.products[0].id,
      title: item.title,
      description: item.description,
      app_price: item.products[0].app_price,
      old_price: item.products[0].old_price,
      brand: item.brand,
      image: item.image,
      app_discount: item.app_discount,
      slug: item.slug,
    };
    hotDealsProductOfferListJSON.push(hotDealsProductOfferJson);
  });

  return hotDealsProductOfferListJSON;
};
