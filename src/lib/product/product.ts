import { customAxios } from '../serverController';

//상품 목록 조회 api
export const apiProductList = async (page: number, size: number) => {
  try {
    let params = { page: page, size: size };
    const productListResult = await customAxios.get(`products`, { params });

    if (productListResult.status !== 200) {
      return productListResult.status;
    }

    if (!productListResult.data.data) {
      return;
    }
    return productListResult.data.data;
  } catch (e) {
    console.error(e);
  }
};

//상품 상세 조회 api
export const apiProductDetail = async (productId: number) => {
  try {
    const productDetailResult = await customAxios.get(`products/${productId}`);
    if (productDetailResult.status !== 200) {
      return productDetailResult.status;
    }

    if (!productDetailResult.data.data) {
      return;
    }
    return productDetailResult.data.data;
  } catch (e) {
    console.error(e);
  }
};
