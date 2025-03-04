<script setup lang="ts">
import { CartService } from '~~/services/domain/cart'
import { CartClient } from '~~/services/infra'
import { useAppStore } from '~~/store/appStore'
import { useCartStore } from '~~/store/cartStore'
import { useProductStore } from '~~/store/productStore'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()
const cartService = CartService(CartClient())
const shopCart = reactive({ quantity: 0 })
const toast = useToast()
const layout = useLocalStorage<'grid' | 'list'>('product-list-layout', 'grid')
const layoutOptions = ['grid', 'list']
const { t } = useI18n()

async function getShopCartQuantity() {
  try {
    shopCart.quantity = await cartService.getCartQuantity()
  } catch (e) {
    console.error(e)
  }
}

async function addToCart(id: string, quantity: number) {
  const index = productStore.products.findIndex((product) => product.id === id)
  try {
    productStore.products[index].isLoading = true
    if (id && quantity > 0) {
      await cartService.addCartItem(id, quantity)
      getShopCartQuantity()
      cartStore.setShopCartItems(await cartService.getAllCartItems())
      toast.add({
        severity: 'success',
        summary: t('toast.success'),
        detail: t('toast.add-to-cart-success'),
        life: 3000,
      })
    }
  } catch (error: any) {
    const errors = error.response.data.errors
    console.log(errors)
    toast.add({
      severity: 'error',
      summary: t('toast.error'),
      detail: t('toast.add-to-cart-error'),
      life: 3000,
    })
  } finally {
    productStore.products[index].isLoading = false
  }
}

onBeforeMount(getShopCartQuantity)
</script>
<template>
  <p-data-view
    :value="productStore.filterProducts"
    :layout="layout"
    data-key="id"
  >
    <template #empty>
      <div class="flex flex-col items-center justify-center h-full py-8 px-4">
        <i class="pi pi- text-2xl text-gray-500" />
        <p class="text-gray-500">No products.</p>
      </div>
    </template>
    <template #header>
      <div class="flex justify-end">
        <p-select-button
          v-model="layout"
          :options="layoutOptions"
          :allowEmpty="false"
        >
          <template #option="{ option }">
            <i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table']" />
          </template>
        </p-select-button>
      </div>
    </template>
    <template #list="{ items }">
      <div class="flex flex-col py-8 px-4 gap-y-4">
        <item-card
          v-for="item in items"
          :key="item.id"
          v-bind="item"
          row
          :loading="item.isLoading"
          @add-to-cart="addToCart"
        />
      </div>
    </template>

    <template #grid="{ items }">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 py-8 px-4"
      >
        <item-card
          v-for="item in items"
          :key="item.id"
          v-bind="item"
          :loading="item.isLoading"
          @add-to-cart="addToCart"
        />
      </div>
    </template>
  </p-data-view>
  <!-- <p-overlay-badge
    :value="shopCart.quantity"
    severity="danger"
    class="
      w-12 h-12 border border-solid border-primary hover:border-primary/80
      rounded-full text-lg bg-white cursor-pointer
      flex items-center justify-center
      !fixed right-6 bottom-6
      transition-all duration-300
      z-[10]
    "
  >
    <nuxt-link
      to="/shop-cart"
      class="
        flex flex-col items-center justify-center
        text-sm no-underline color-primary hover:color-primary/80
        transition-all duration-300
      "
    >
      <i class="pi pi-shopping-cart" />
      <span class="txt">{{ $t('cart') }}</span>
    </nuxt-link>
  </p-overlay-badge> -->
</template>
