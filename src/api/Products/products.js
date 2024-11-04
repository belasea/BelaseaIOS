import {bela} from '../api';

export const productSearchApi = async (search_string, pageData) => {
  let res;
  if (search_string) {
    if (pageData === 1) {
      res = await bela(
        `/search/api/product-main-search/?title=${search_string}`,
      );
    } else {
      res = await bela(
        `/search/api/product-main-search/?page=${pageData}&title=${search_string}`,
      );
    }
  } else {
    res = await bela(`/search/api/product-main-search/?page=${pageData}`);
  }

  return res.data;
};

export const getProduct = async slug => {
  try {
    let product_list = [];
    const res = await bela(`/products/api/${slug}/`);

    if (res.data.product_detail.image) {
      product_list.push({
        image: res.data.product_detail.image,
        app_discount: res.data.product_detail.app_discount,
      });
    }

    if (res.data.product_detail.image1) {
      product_list.push({
        image: res.data.product_detail.image1,
        app_discount: res.data.product_detail.app_discount,
      });
    }

    if (res.data.product_detail.image2) {
      product_list.push({
        image: res.data.product_detail.image2,
        app_discount: res.data.product_detail.app_discount,
      });
    }

    let productJSON = {
      id: res.data.product_detail.products[0].id,
      // pro_id: res.data.product_detail.products[0].pro_id,
      title: res.data.product_detail.title,
      slug: res.data.product_detail.slug,
      health_tips: res.data.product_detail.health_tips,
      description: res.data.product_detail.row_description,
      weight: res.data.product_detail.products[0].weight,
      app_price: res.data.product_detail.products[0].app_price,
      old_price: res.data.product_detail.products[0].old_price,
      brand: res.data.product_detail.brand,
      image: res.data.product_detail.image,
      app_discount: res.data.product_detail.app_discount,
      buy_one_get_one: res.data.product_detail.products[0].buy_one_get_one,
      limit_buy: res.data.product_detail.products[0].limit_buy,
      active: res.data.product_detail.products[0].active,
      product_list_data: product_list,
    };
    return productJSON;
  } catch (error) {
    console.log(error.response.data);
  }
};
