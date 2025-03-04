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
  shopCartItems: ICartProduct[]
}

export const useCartStore = defineStore('cart', () => {
  const discountStore = useDiscount()
  const { discountPercent } = storeToRefs(discountStore)
  const state = reactive<CartState>({
    loading: false,
    shopCartItems: [],
  })
  const countAll = computed(() => {
    const total = state.shopCartItems.reduce(
      (cur: number, el: ICartProduct) =>
        cur + el.quantity * (el.price ? el.price : el.origin_price),
      0,
    )
    return total * (discountPercent.value / 100 || 1)
  })

  function setShopCartItems(data: any) {
    state.shopCartItems = [...data]
  }
  function deleteItem(index: number) {
    state.shopCartItems.splice(index, 1)
  }
  function deleteAllItem() {
    state.shopCartItems = []
  }

  return {
    ...toRefs(state),
    countAll,
    setShopCartItems,
    deleteItem,
    deleteAllItem,
  }
})
