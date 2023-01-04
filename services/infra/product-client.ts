import { AxiosResponse } from 'axios'
import { HttpClient } from './core'

export interface IProductClient {
  getProducts(p: number): Promise<AxiosResponse<Service.IProductResponse>>
  getProductDetail(
    id: string,
  ): Promise<AxiosResponse<Service.IProductDetailResponse>>
}

export const ProductClient = (): IProductClient => {
  const config = useRuntimeConfig()
  const client = HttpClient({
    timeout: 30000,
    prefix: `${config.apiUUID}/ec/`,
  })

  return {
    async getProducts(p) {
      return await client.get<Service.IProductResponse>(`products?page=${p}`)
    },
    async getProductDetail(id) {
      return await client.get<Service.IProductDetailResponse>(`product/${id}`)
    },
  }
}
