<script lang="ts" setup>
import { addCart, getDataDetail } from '~~/services/frontend'
import { useAppStore } from '~~/store/appStore'
import { useProductStore } from '~~/store/productStore'
import { ProductClient } from '~~/services/infra'
import { ProductService } from '~~/services/domain/product'

const route = useRoute()
const store = useAppStore()
const productStore = useProductStore()
const productService = ProductService(ProductClient())
const isLoading = ref(false)
const isQuantityMinimum = computed(
  () => productStore.tempProduct.quantity === 1,
)

function descriptionDisplay(description?: string) {
  if (description) {
    return description
      .replace(/\n/g, '<br>')
      .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
  }
  return ''
}

const getProduct = async () => {
  const { id } = route.params
  const resp = await productService.getProduct(id as string)
  productStore.setTempProduct({
    ...resp,
    quantity: 1,
  })
}

const countQuantity = (operate: string) => {
  const restStore = productStore.tempProduct.store
  if (operate === 'm') {
    if (productStore.tempProduct.quantity > 1) {
      productStore.tempProduct.quantity -= 1
    }
  } else if (operate === 'p') {
    if (productStore.tempProduct.quantity + 1 <= restStore) {
      productStore.tempProduct.quantity += 1
    } else {
      store.setMsg({
        type: false,
        msg: `商品只剩下 ${restStore} ${productStore.tempProduct.unit}`,
      })
    }
  }
}
const updateCartData = () => {
  const restStore = productStore.tempProduct.store
  if (productStore.tempProduct.quantity < 1) {
    productStore.tempProduct.quantity = 1
  } else if (productStore.tempProduct.quantity > restStore) {
    productStore.tempProduct.quantity = restStore
    store.setMsg({
      type: false,
      msg: `商品只剩下 ${restStore} ${productStore.tempProduct.unit}`,
    })
  }
}

const addToCart = async (id: string, quantity: number) => {
  isLoading.value = true
  const restStore = productStore.tempProduct.store
  if (id && quantity > 0) {
    if (quantity > restStore) {
      store.setMsg({
        type: false,
        msg: '下單數量超過商品庫存數量！',
      })
      return
    }
    try {
      await addCart(id, quantity)
      store.setMsg({
        msg: '已加入購物車',
        type: true,
      })
      isLoading.value = false
    } catch (error: any) {
      store.setMsg({
        msg: error.response.data.errors[0],
        type: false,
      })
      isLoading.value = false
    }
  }
}

const { data, status, error } = useAsyncData(getProduct)
onBeforeUnmount(productStore.clearTempProduct)
</script>

<template>
  <p-fluid>
    <p-card class="relative m-4">
      <template #header>
        <p-galleria :value="productStore.tempProduct.imageUrl">
          <template #item="{ item }">
            <p-skeleton
              v-if="status !== 'success' && status !== 'error'"
              width="100%"
              height="100%"
            />
            <nuxt-img v-else :src="item" loading="lazy" format="webp" alt="" />
          </template>
        </p-galleria>
        <div class="absolute top-2 inset-x-2 flex">
          <p-tag
            :value="kebabToUpper(productStore.tempProduct.category)"
            severity="secondary"
            class="ml-auto"
          />
          <p-tag
            v-if="productStore.tempProduct.store < 5"
            value="HOT"
            severity="danger"
            class="ml-2"
          />
        </div>
      </template>

      <template #title>
        {{ productStore.tempProduct.title }}
      </template>

      <template #content>
        <h3 class="font-semibold mb-2">商品說明</h3>
        <p
          class="mb-4"
          v-html="descriptionDisplay(productStore.tempProduct.content)"
        />
        <h3 class="font-semibold mb-2">商品資訊</h3>
        <p
          class="mb-4"
          v-html="descriptionDisplay(productStore.tempProduct.description)"
        />
        <h3 class="font-semibold mb-2">售價</h3>
        <div class="price is-size-5 has-text-weight-bold mb-4">
          {{ toCash(productStore.tempProduct.price) }}
          <span :class="{ strike: productStore.tempProduct.price }">
            {{ toCash(productStore.tempProduct.origin_price) }}
          </span>
        </div>
        <h3 class="font-semibold mb-2">庫存</h3>
        <p class="mb-4">
          {{ productStore.tempProduct.store }}
          {{ productStore.tempProduct.unit }}
        </p>
      </template>

      <template #footer>
        <div class="flex gap-x-4">
          <p-input-number
            v-model="productStore.tempProduct.quantity"
            class="text-center"
            showButtons
            :max="Number(productStore.tempProduct.store)"
            buttonLayout="horizontal"
            @change="updateCartData"
          >
            <template #decrementbuttonicon>
              <span class="pi pi-minus" />
            </template>
            <template #incrementbuttonicon>
              <span class="pi pi-plus" />
            </template>
          </p-input-number>

          <p-button
            :label="
              $t(productStore.tempProduct.store ? 'add-to-cart' : 'sold-out')
            "
            :loading="isLoading"
            :disabled="productStore.tempProduct.store < 1"
            @click="
              addToCart(
                productStore.tempProduct.id,
                productStore.tempProduct.quantity,
              )
            "
          />
        </div>
      </template>
    </p-card>
  </p-fluid>
</template>

<style lang="scss" scoped>
section {
  height: 100%;
}
.is-fixed {
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  z-index: 1;
}
.is-img-centered {
  display: flex;
  align-items: center;
  justify-content: center;
}
.content-tag {
  font-size: 16px;
  margin: 5px 0;
}
.description {
  min-height: 120px;
  max-height: 200px;

  overflow: hidden;
  text-overflow: ellipsis;
  color: $darkgrayn;
}
.content {
  min-height: 120px;
  max-height: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: $darkgrayn;
}
.content,
.price {
  margin-bottom: 10px;
}
:deep(.star) {
  color: #ddd;
  text-shadow: 0.05em 0.05em #aaa;
  &.fill {
    color: #fd0;
  }
}
.comment {
  font-size: 14px;
}
</style>
