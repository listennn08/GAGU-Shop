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
const quantityMinest = computed(() => productStore.tempProduct.quantity === 1)
const descriptionDisplay = (discription?: string) =>
  discription
    ? discription
        .replace(/\n/g, '<br>')
        .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
    : ''

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

const { data, pending, error } = useAsyncData(getProduct)
onBeforeUnmount(productStore.clearTempProduct)
</script>

<template>
  <loader v-show="pending" />
  <section v-show="!pending" class="section is-paddingless">
    <div class="container mt-1">
      <div class="columns is-desktop">
        <div class="column is-full">
          <div class="box is-shadowless" v-if="productStore.tempProduct">
            <div class="columns">
              <span class="tag is-primary is-fixed is-uppercase">
                {{ kebabToUpper(productStore.tempProduct.category) }}
              </span>
              <div class="colum is-img-centered">
                <div class="crad-image">
                  <figure
                    class="image"
                    v-if="productStore.tempProduct.imageUrl"
                  >
                    <nuxt-img
                      v-for="url in productStore.tempProduct.imageUrl"
                      :key="url"
                      :src="url"
                      loading="lazy"
                      format="webp"
                      alt=""
                    />
                  </figure>
                </div>
              </div>
              <div class="column has-text-left">
                <h4 class="title is-4 flex items-center">
                  {{ productStore.tempProduct.title }}
                  <span
                    v-if="productStore.tempProduct.store < 5"
                    class="ml-2 tag is-danger"
                  >
                    HOT
                  </span>
                </h4>
                <div class="tag content-tag is-light mb-1">產品說明</div>
                <section class="description mb-3">
                  <p
                    class="is-marginless"
                    v-html="
                      descriptionDisplay(productStore.tempProduct.content)
                    "
                  />
                </section>
                <div class="tag content-tag is-light mb-1">產品資訊</div>
                <section class="content mb-3">
                  <p
                    class="is-marginless"
                    v-html="
                      descriptionDisplay(productStore.tempProduct.description)
                    "
                  />
                </section>
                <div class="tag content-tag is-light mb-1">售價</div>
                <div class="price is-size-5 has-text-weight-bold mb-3">
                  {{ toCash(productStore.tempProduct.price) }}
                  <span
                    class="is-size-6"
                    :class="{
                      strike: productStore.tempProduct.price,
                    }"
                  >
                    {{ toCash(productStore.tempProduct.origin_price) }}
                  </span>
                </div>
                <div class="tag content-tag is-light mb-1">庫存</div>
                <p class="mb-3">
                  {{ productStore.tempProduct.store }}
                  {{ productStore.tempProduct.unit }}
                </p>
                <div class="card-foot">
                  <div class="field has-addons has-addons-lefted mt-1">
                    <div class="control">
                      <button
                        class="button is-left"
                        @click="countQuantity('m')"
                        :disabled="quantityMinest"
                      >
                        &minus;
                      </button>
                    </div>
                    <div class="control">
                      <input
                        class="input has-text-centered"
                        type="number"
                        v-model="productStore.tempProduct.quantity"
                        @change="updateCartData()"
                      />
                    </div>
                    <div class="control">
                      <button
                        class="button is-right"
                        @click="countQuantity('p')"
                      >
                        &plus;
                      </button>
                    </div>
                    <button
                      class="button is-primary addCart mx-2 is-fullwidth"
                      @click="
                        addToCart(
                          productStore.tempProduct.id,
                          productStore.tempProduct.quantity,
                        )
                      "
                      :class="{ 'is-loading': isLoading }"
                      :disabled="productStore.tempProduct.store < 1"
                    >
                      {{
                        $t(
                          productStore.tempProduct.store
                            ? 'add-to-cart'
                            : 'sold-out',
                        )
                      }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-8" v-if="productStore.tempProduct.category">
        <random-recommends
          title="相關商品"
          titleSide="has-text-left"
          :type="productStore.tempProduct.category"
          :id="productStore.tempProduct.id"
        />
      </div>
      <div>
        <div
          class="subtitle is-4 is-clearfix has-text-weight-bold has-text-left"
        >
          商品評論
        </div>
        <div class="flex flex-wrap -mx-2">
          <comment
            v-for="feedback in productStore.tempProduct.feedback"
            :key="feedback.id"
            :feedback="feedback"
          />
        </div>
      </div>
    </div>
  </section>
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
  @include small {
    max-height: 215px;
  }
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
