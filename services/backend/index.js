import axios from 'axios'
import cookies from '@/cookies'

const { VUE_APP_API_UUID } = process.env
const Request = axios.create({
  timeout: 30000,
  baseURL: `https://course-ec-api.hexschool.io/api/${VUE_APP_API_UUID}/admin/`,
})

Request.interceptors.request.use((request) => {
  const req = request
  req.headers.Authorization = `Bearer ${cookies.getItem('token')}`
  return req
})

/** product api */
export const getBackendAllData = (p = 1) => Request.get(`ec/products?page=${p}`)
export const getBackendDataDetail = (id) => Request.get(`ec/product/${id}`)
export const createData = (data) => Request.post('ec/product', data)
export const updateData = (id, data) => Request.patch(`ec/product/${id}`, data)
export const deleteData = (id) => Request.delete(`ec/product/${id}`)

/** coupon api */
export const getBackendAllCupons = () => Request.get('ec/coupons')
export const getBackendCuponDetail = (id) => Request.get(`ec/coupon/${id}`)
export const createCuponData = (data) => Request.post('ec/coupon', data)
export const updateCuponData = (id, data) =>
  Request.patch(`ec/coupon/${id}`, data)
export const deleteCuponData = (id) => Request.delete(`ec/coupon/${id}`)

/** order api */
export const getBackendOrders = () => Request.get('ec/orders')
export const changeOrderPayment = (id, action) =>
  Request.patch(`ec/orders/${id}/${action ? 'paid' : 'unpaid'}`)

/** file api */
export const getFile = () => Request.get('storage')
export const uploadFile = (data) => Request.post('storage', data)
export const deleteFile = (id) => Request.delete(`storage/${id}`)
