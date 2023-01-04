import type { IOrderClient, OrderInfo } from '../infra'

export interface IOrderService {
  getOrder(id: string): Promise<any>
  createOrder(data: OrderInfo): Promise<any>
}
export const OrderService = (client: IOrderClient): IOrderService => {
  return {
    async getOrder(id: string) {
      try {
        const resp = (await client.getOrder(id)).data.data

        return {
          ...resp,
          products: resp.products.map((el) => ({
            ...el.product,
            quantity: el.quantity,
          })),
        }
      } catch (e) {
        throw e
      }
    },
    createOrder(data) {
      return client.createOrder(data)
    },
  }
}
