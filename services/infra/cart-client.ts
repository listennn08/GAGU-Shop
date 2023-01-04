import { AxiosResponse } from 'axios'
import { HttpClient } from './core'

interface ICartProduct {
  created: Service.ITime
  product: Service.IProduct
  updated: Service.ITime
  quantity: number
}

export interface ICartClient {
  getCart(): Promise<
    AxiosResponse<{
      data: ICartProduct[]
      meta: Service.IMeta
    }>
  >
  addCart(
    productId: string,
    quantity: number,
  ): Promise<AxiosResponse<ICartProduct>>
  updateCart(
    productId: string,
    quantity: number,
  ): Promise<AxiosResponse<ICartProduct>>
  deleteCart(productId?: string): Promise<
    AxiosResponse<{
      message: string
    }>
  >
}

export const CartClient = (): ICartClient => {
  const config = useRuntimeConfig()
  const client = HttpClient({
    timeout: 30000,
    prefix: `${config.apiUUID}/ec/`,
  })

  return {
    async getCart() {
      return await client.get('shopping')
    },
    async addCart(product, quantity) {
      return await client.post('shopping', { product, quantity })
    },
    async updateCart(product, quantity) {
      return await client.patch('shopping', { product, quantity })
    },
    async deleteCart(productId) {
      return await (productId
        ? client.delete(`shopping/${productId}`)
        : client.delete('shopping/all/product'))
    },
  }
}
