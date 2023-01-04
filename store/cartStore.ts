export interface ICartProduct {
  id: string
  title: string
  category: string
  content: string
  imageUrl: string[]
  enabled: boolean
  origin_price: number
  price: number
  unit: string
  quantity: number
  isLoading: boolean
  description?: string
  store: number
  onsale: number
}

interface CartState {
  loading: boolean
  shopcartItems: ICartProduct[]
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    loading: false,
    shopcartItems: [],
  }),
  actions: {
    setShopcartItems(data: any) {
      this.shopcartItems = [...data]
    },
    deleteItem(index: number) {
      this.shopcartItems.splice(index, 1)
    },
    deleteAllItem() {
      this.shopcartItems = []
    },
  },
})
