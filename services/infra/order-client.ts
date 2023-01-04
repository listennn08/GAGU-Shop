import { HttpClient } from './core'

import type { AxiosResponse } from 'axios'

interface Order {
  id: string
  coupon: Coupon
  amount: number
  products: Product[]
  payment: string
  paid: boolean
  paid_at: string
  paid_diff: string
  created_at: string
  created_diff: string
  updated_at: string
  updated_diff: string
}

interface Coupon {
  title: string
  code: string
  percent: number
  enabled: boolean
  deadline_at: string
}

interface Product {
  product: Service.IProduct
  quantity: number
}

export interface OrderInfo {
  name: string
  email: string
  tel: string
  address: string
  payment: string
  coupon?: string
  message?: string
}

export interface IOrderClient {
  createOrder: (data: OrderInfo) => Promise<
    AxiosResponse<{
      data: Order
      meta: Service.IMeta
    }>
  >
  getAllOrders: () => Promise<AxiosResponse<{ data: Order[] }>>
  getOrder: (id: string) => Promise<AxiosResponse<{ data: Order }>>
  payOrder: (id: string) => Promise<AxiosResponse<{ data: Order }>>
}

export const OrderClient = (): IOrderClient => {
  const config = useRuntimeConfig()
  const client = HttpClient({
    timeout: 30000,
    prefix: `${config.apiUUID}/ec/`,
  })

  return {
    async createOrder(data) {
      return client.post('orders', { ...data })
    },
    async getAllOrders() {
      return client.get('orders')
    },
    async getOrder(id) {
      return client.get(`orders/${id}`)
    },
    async payOrder(id) {
      return client.post(`orders/${id}/paying`)
    },
  }
}
