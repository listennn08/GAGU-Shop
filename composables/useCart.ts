import { deleteCart, getCart, updateCart } from '~~/services/frontend'
import { CartService } from '~~/services/domain/cart'
import { CartClient } from '~~/services/infra'
import { useCartStore } from '~~/store/cartStore'
import { useProductStore } from '~~/store/productStore'

export const useCart = async () => {
  const cartStore = useCartStore()
  const productStore = useProductStore()
  const cartService = CartService(CartClient())
  const removeAllContainer = ref()

  const countAll = computed(() =>
    cartStore.shopcartItems.reduce(
      (pre, cur) =>
        pre + cur.quantity * (cur.price ? cur.price : cur.origin_price),
      0,
    ),
  )

  const itemTotal = (index: number) => {
    const item = cartStore.shopcartItems[index]
    return item.quantity * (item.price ? item.price : item.origin_price)
  }
  const quantityMinest = (index: number) =>
    cartStore.shopcartItems[index].quantity === 1

  const getShopCartData = async () => {
    if (cartStore.loading === true || cartStore.shopcartItems.length) return
    try {
      cartStore.loading = true
      const resp = await cartService.getAllCartItems()
      cartStore.setShopcartItems(resp)
    } catch (e) {
      console.error(e)
    } finally {
      cartStore.loading = false
    }
  }

  const countQuantity = (index: number, operate: string) => {
    const item = cartStore.shopcartItems[index]
    const product = productStore.products.find((el) => el.id === item.id)
    if (operate === 'm' && item.quantity > 1) {
      item.quantity -= 1
    } else if (operate === 'p') {
      if (product && item.quantity < product.store) item.quantity += 1
    }
    updateCartData(index)
  }

  const updateCartData = (index: number) => {
    const { id, quantity } = cartStore.shopcartItems[index]
    if (quantity < 1) {
      cartStore.shopcartItems[index].quantity = 1
    }
    const product = productStore.products.find((el) => el.id === id)
    if (product && quantity < product.store) {
      updateCart(
        cartStore.shopcartItems[index].id,
        cartStore.shopcartItems[index].quantity,
      )
    }
  }

  // MouseEvent
  async function deleteCartData(e: MouseEvent): Promise<void>
  async function deleteCartData(idx: number): Promise<void>
  async function deleteCartData(eOrIndex: number | MouseEvent): Promise<void> {
    if (typeof eOrIndex === 'number') {
      const item = cartStore.shopcartItems[eOrIndex]
      item.isLoading = true
      await deleteCart(cartStore.shopcartItems[eOrIndex].id)
      cartStore.deleteItem(eOrIndex)
    } else {
      // const loader = this.$loading.show({
      //   container: this.$refs.removeAllContainer,
      //   isFullPage: false,
      // });
      await deleteCart()
      cartStore.deleteAllItem()
      // loader.hide();
    }
  }

  await useAsyncData(getShopCartData)

  return {
    shopcartItems: cartStore.shopcartItems,
    countAll,
    removeAllContainer,
    itemTotal,
    quantityMinest,
    getShopCartData,
    updateCartData,
    countQuantity,
    deleteCartData,
  }
}
