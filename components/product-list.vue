<script lang="ts" setup>
import { CartService } from '~~/services/domain/cart'
import { CartClient } from '~~/services/infra'
import { useAppStore } from '~~/store/appStore'
import { useCartStore } from '~~/store/cartStore'
import { useProductStore } from '~~/store/productStore'

const store = useAppStore()
const productStore = useProductStore()
const cartStore = useCartStore()
const cartService = CartService(CartClient())
const pagination = 0
const shopcart = reactive({ quantity: 0 })

const showPagination = computed(() => {
  return (
    productStore.pagination.current_page &&
    productStore.pagination.total_pages! > 1
  )
})

const quantityLimit = (index: number, type: string, store: number) => {
  if (store) {
    if (type === 'min') {
      return productStore.products[index].quantity === 1
    }
    return (
      productStore.products[index].quantity ===
      productStore.products[index].store
    )
  }
  return true
}

const getShopcartQuantity = async () => {
  try {
    shopcart.quantity = await cartService.getCartQuantity()
  } catch (e) {
    console.error(e)
  }
}

const countQuantity = (pid: number, operate: string) => {
  if (operate === 'm') {
    if (productStore.products[pid].quantity! > 1) {
      productStore.products[pid].quantity! -= 1
    }
  } else if (operate === 'p') {
    productStore.products[pid].quantity! += 1
  }
}

const updateCartData = (index: number, store: number) => {
  if (productStore.products[index].quantity! < 1) {
    productStore.products[index].quantity = 1
  } else if (productStore.products[index].quantity! > store) {
    productStore.products[index].quantity = store
  }
}
const addToCart = async (index: number, id: string, quantity: number) => {
  productStore.products[index].isLoading = true
  if (id && quantity > 0) {
    try {
      await cartService.addCartItem(id, quantity)
      getShopcartQuantity()
      cartStore.setShopcartItems(await cartService.getAllCartItems())
    } catch (error: any) {
      if (error.response) {
        const errors = error.response.data.errors
        store.setMsg({
          msg: errors[0],
          type: false,
        })
      }
      throw error
    } finally {
      productStore.products[index].isLoading = false
    }
  } else {
    productStore.products[index].isLoading = false
  }
}

onBeforeMount(getShopcartQuantity)
</script>
<template>
  <section class="section is-paddingless">
    <div class="container">
      <div
        class="columns is-multiline is-marginless is-variable is-desktop is-centered columns-centered"
      >
        <div
          class="column is-4-fullhd is-5-widescreen is-6-desktop is-10-tablet is-full-mobile"
          v-for="(item, index) in productStore.filterProducts"
          :data-id="item.id"
          :key="item.id"
        >
          <div
            class="box has-text-left is-rounded"
            @click="$router.push(`/product/${item.id}`)"
          >
            <div class="card-image columns is-marginless is-cus-centered">
              <div class="has-background-primary has-text-light is-category">
                {{ kebabToUpper(item.category) }}
              </div>
              <figure class="image is-256x256">
                <nuxt-img
                  format="webp"
                  :src="item.imageUrl[0]"
                  alt=""
                  class="is-rounded"
                  loading="lazy"
                />
              </figure>
            </div>
            <div class="card-content is-paddingless px-2 py-5 mb-auto">
              <div class="title is-4" :title="item.title">
                {{ item.title }}
              </div>
              <div class="content is-marginless">
                {{ hideContent(item.content) }}
              </div>
              <div class="has-text-right is-marginless">
                <NuxtLink
                  class="descript-link has-text-weight-bold"
                  @click.stop=""
                  :to="`/product/${item.id}`"
                  :disabled="!item.store"
                >
                  查看更多 &raquo;
                </NuxtLink>
              </div>
              <div class="is-marginless">
                <div class="price in-bottom" v-if="item.price">
                  {{ toCash(item.price) }}
                  <span :class="{ strike: item.price }">
                    {{ toCash(item.origin_price) }}
                  </span>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <div class="columns is-marginless is-paddingless is-mobile">
                <div class="column is-6-mobile is-paddingless">
                  <div
                    class="field has-addons has-addons-centered mt-1 is-fullwidth"
                  >
                    <div class="control">
                      <button
                        class="button is-left"
                        @click.stop="countQuantity(index, 'm')"
                        :disabled="quantityLimit(index, 'min', item.store)"
                      >
                        &minus;
                      </button>
                    </div>
                    <div class="control is-expanded">
                      <input
                        type="number"
                        class="input has-text-centered"
                        v-model="item.quantity"
                        @click.stop=""
                        @change="updateCartData(index, item.store)"
                        :disabled="!item.store"
                      />
                    </div>
                    <div class="control">
                      <button
                        class="button is-right"
                        @click.stop="countQuantity(index, 'p')"
                        :disabled="quantityLimit(index, 'max', item.store)"
                      >
                        &plus;
                      </button>
                    </div>
                  </div>
                  <div
                    v-if="item.store === 1"
                    class="column is-paddingless is-marginless"
                  >
                    <small class="has-text-danger">
                      熱銷商品！剩最後一組！
                    </small>
                  </div>
                </div>
                <div class="column is-paddingless">
                  <div
                    class="field has-addons has-addons-centered mt-1 is-fullwidth"
                  >
                    <div class="control is-expanded">
                      <button
                        class="button is-primary addCart ml-1 is-fullwidth"
                        :class="{
                          'is-loading': item.isLoading,
                        }"
                        :disabled="!item.store"
                        @click.stop="addToCart(index, item.id, item.quantity!)"
                      >
                        {{ $t(item.store ? 'add-to-cart' : 'sold-out') }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <pagination v-if="showPagination" :pagination="pagination" />
      <NuxtLink class="shopcart-layer" to="/shopcart">
        <div class="shop-container">
          <div class="cart-count" v-if="shopcart.quantity">
            {{ shopcart.quantity }}
          </div>
          <i class="icon i-fa-solid-shopping-cart" />
          <div class="txt">{{ $t('cart') }}</div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.section {
  min-height: 100%;
}
.container {
  @include mobileScreen {
    margin-top: 15%;
  }
}
.box {
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    box-shadow: 3px 3px 6px rgba($navyblue, 0.6);
  }
  &.disabled {
    cursor: default;
    pointer-events: none;
    position: relative;
    &::before {
      content: 'SOLD OUT';
      position: absolute;
      width: 70%;
      height: 45%;
      padding: 25% 5%;
      top: 25%;
      left: 15%;
      border: 3px solid #888;
      border-radius: 50%;
      box-sizing: border-box;
      text-align: center;
      transform: rotate(-30deg);
      color: #888;
      text-shadow: 3px 3px 3px #444;
      font-size: 36px;
      font-weight: 900;
      z-index: 3;
      @include xxxs {
        height: 38%;
        padding: 18% 5%;
      }
    }
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(#ddd, 0.4);
      z-index: 2;
      top: 0;
      left: 0;
    }
    &:hover {
      box-shadow: none;
    }
  }
}

.columns-centered {
  display: flex;
  justify-content: flex-start;
  @include mobileScreen {
    justify-content: center;
  }
}
.is-cus-centered {
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  color: $navyblue;
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.is-category {
  position: absolute;
  left: 0;
  top: 0;
  width: 30%;
  text-align: center;
  padding: 1% 2%;
  border-radius: 10px;
  font-size: 12px;
  text-transform: uppercase;
  z-index: 2;
}
.media-left,
.image .is-rounded {
  border-radius: 15px;
}
.content {
  min-height: 70px;
  max-height: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: $darkgrayn;
}
.descript-link {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    height: 1px;
    left: 0;
    right: 100%;
    bottom: -1px;
    background: $navyblue;
    transition: 0.5s;
  }
  &:hover::before {
    right: 0;
  }
}
.shopcart-layer {
  width: 65px;
  height: 65px;
  font-size: 20px;
  border: 2px solid $darkgray;
  border-radius: 50%;
  position: fixed;
  right: 2%;
  bottom: 2%;
  color: $navyblue;
  text-align: center;
  transition: 0.5s;
  text-decoration: none;
  background: $lightgray;
  z-index: 5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  @include largeScreen {
    right: 5%;
    bottom: 4%;
  }
  &:hover {
    box-shadow: 2px 2px 4px $goldyellow;
    text-decoration: underline;
  }
}
.shop-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .cart-count {
    position: absolute;
    top: -15px;
    right: -10px;
    background: #ff0000;
    color: #fff;
    font-size: 12px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    box-shadow: 2px 2px 5px rgba(#dd0000, 0.8);
  }
  .txt {
    font-size: 6px;
    overflow-wrap: nowrap;
  }
}
</style>
