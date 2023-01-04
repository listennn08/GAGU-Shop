import { useCartStore } from '~~/store/cartStore'
import { ICartClient } from '../infra'

export interface ICartService {
  getAllCartItems(): Promise<any>
  addCartItem(product: string, quantity: number): Promise<any>
  updateCartItem(product: string, quantity: number): Promise<any>
  deleteCartItem(id: string): Promise<any>
  deleteAllCartITems(): Promise<any>
  getCartQuantity(): Promise<number>
}

export const CartService = (client: ICartClient): ICartService => {
  return {
    async getAllCartItems() {
      const resp = await client.getCart()
      return resp.data.data.map((el) => ({
        ...el.product,
        quantity: el.quantity,
        isLoading: false,
      }))
    },

    async addCartItem(product: string, quantity: number) {
      const cartStore = useCartStore()
      try {
        const cartItem = cartStore.shopcartItems.find(
          ({ id }: { id: string }) => id === product,
        )
        if (cartItem === undefined) {
          return await client.addCart(product, quantity)
        } else {
          return await client.updateCart(product, cartItem.quantity + quantity)
        }
      } catch (error: any) {
        if (error.response) {
          const status = error.response.status
          const errors = error.response.data.errors
          if (status === 422 && errors[0] === '該商品已放入購物車當中。') {
            return await client.updateCart(product, quantity)
          }
        }
        throw error
      }
    },

    async updateCartItem(product: string, quantity: number) {
      return await client.updateCart(product, quantity)
    },

    async deleteCartItem(id: string) {
      return await client.deleteCart(id)
    },

    async deleteAllCartITems() {
      return await client.deleteCart()
    },

    /**
     * Get cart item quantity.
     *
     * @returns quantity
     */
    async getCartQuantity() {
      try {
        const resp = await client.getCart()
        return resp.data.meta.pagination.total
      } catch (e) {
        throw e
      }
    },
  }
}
