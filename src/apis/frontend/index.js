import axios from 'axios';

const { VUE_APP_API_UUID } = process.env;
const Request = axios.create({
  timeout: 30000,
  baseURL: `https://course-ec-api.hexschool.io/api/${VUE_APP_API_UUID}/ec/`,
});

/** product api */
export const getAllProducts = (p = 1) => Request.get(`products?page=${p}`);
export const getDataDetail = (id) => Request.get(`product/${id}`);

/** shopcart api */
export const getCart = () => Request.get('shopping');
export const addCart = (product, quantity) => Request.post('shopping', {
  product,
  quantity,
});
export const updateCart = (product, quantity) => Request.patch('shopping', {
  product,
  quantity,
});
export const deleteCart = (product) => (product ? Request.delete(`shopping/${product}`) : Request.delete('shopping/all/product'));

export const checkCoupon = (code) => Request.post('coupon/search', {
  code,
});

export const createOrder = (data) => Request.post('orders', { ...data });
export const getAllOrders = () => Request.get('orders');
export const getOrder = (id) => Request.get(`orders/${id}`);
export const payOrder = (id) => Request.post(`orders/${id}/paying`);
