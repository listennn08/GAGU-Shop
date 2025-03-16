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
    cartStore.shopCartItems.reduce(
      (pre, cur) =>
        pre + cur.quantity * (cur.price ? cur.price : cur.origin_price),
      0,
    ),
  )

  function itemTotal(index: number) {
    const item = cartStore.shopCartItems[index]
    return item.quantity * (item.price ? item.price : item.origin_price)
  }
  function checkQuantityIsMinimum(index: number) {
    return cartStore.shopCartItems[index].quantity === 1
  }

  async function getShopCartData() {
    if (cartStore.loading === true || cartStore.shopCartItems.length) return
    try {
      cartStore.loading = true
      const resp = await cartService.getAllCartItems()
      cartStore.setShopCartItems(resp)
    } catch (e) {
      console.error(e)
    } finally {
      cartStore.loading = false
    }
  }

  const countQuantity = (index: number, operate: string) => {
    const item = cartStore.shopCartItems[index]
    const product = productStore.products.find((el) => el.id === item.id)
    if (operate === 'm' && item.quantity > 1) {
      item.quantity -= 1
    } else if (operate === 'p') {
      if (product && item.quantity < product.store) item.quantity += 1
    }
    updateCartData(index)
  }

  const updateCartData = (index: number) => {
    const { id, quantity } = cartStore.shopCartItems[index]
    if (quantity < 1) {
      cartStore.shopCartItems[index].quantity = 1
    }
    const product = productStore.products.find((el) => el.id === id)
    if (product && quantity < product.store) {
      updateCart(
        cartStore.shopCartItems[index].id,
        cartStore.shopCartItems[index].quantity,
      )
    }
  }

  // MouseEvent
  async function deleteCartData(e: MouseEvent): Promise<void>
  async function deleteCartData(idx: number): Promise<void>
  async function deleteCartData(eOrIndex: number | MouseEvent): Promise<void> {
    if (typeof eOrIndex === 'number') {
      const item = cartStore.shopCartItems[eOrIndex]
      item.isLoading = true
      await deleteCart(cartStore.shopCartItems[eOrIndex].id)
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

  useAsyncData('shopCart', getShopCartData)

  return {
    shopCartItems: cartStore.shopCartItems,
    countAll,
    removeAllContainer,
    itemTotal,
    checkQuantityIsMinimum,
    getShopCartData,
    updateCartData,
    countQuantity,
    deleteCartData,
  }
}
