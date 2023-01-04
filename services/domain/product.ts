import { IProduct } from '~~/store/productStore'
import { IProductClient } from '../infra'

export interface IProductService {
  getAllProducts(p?: number): Promise<{
    products: (IProduct &
      Omit<IParseOption, 'feedback'> & { isLoading: boolean })[]
    pagination: Service.IPagination
  }>
  getProduct(id: string): Promise<IProduct & IParseOption>
}

interface IFeedback {
  id: string
  star: number
  comment: string
  pic: string
}

interface IParseOption {
  store: number
  feedback: IFeedback[]
}

export const ProductService = (client: IProductClient): IProductService => {
  return {
    async getAllProducts(p = 1) {
      const resp = await client.getProducts(p)
      return {
        products: [...resp.data.data].map((el) => ({
          ...el,
          quantity: 1,
          store: parseInt(JSON.parse(el.options).store, 10),
          isLoading: false,
        })),
        pagination: resp.data.meta.pagination,
      }
    },
    async getProduct(id) {
      const resp = await client.getProductDetail(id)
      return {
        ...resp.data.data,
        ...JSON.parse(resp.data.data.options),
      }
    },
  }
}
