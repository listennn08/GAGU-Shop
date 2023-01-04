<script lang="ts" setup>
import { useCartStore } from '~~/store/cartStore'

const cartStore = useCartStore()
const {
  countAll,
  itemTotal,
  deleteCartData,
  countQuantity,
  quantityMinest,
  updateCartData,
} = await useCart()
</script>
<template>
  <section class="section is-paddingless">
    <div v-if="cartStore.shopcartItems?.length > 0" class="container mb-8">
      <div class="action">
        <button
          class="button is-light my-2"
          @click="deleteCartData"
          ref="removeAllContainer"
        >
          刪除所有商品
        </button>
      </div>
      <cart-table
        :shopcartItems="cartStore.shopcartItems"
        :countQuantity="countQuantity"
        :quantityMinest="quantityMinest"
        :updateCartData="updateCartData"
        :itemTotal="itemTotal"
        :deleteCartData="deleteCartData"
        :countAll="countAll"
      />
      <div class="mobile mb-2">
        <div
          v-for="(item, index) in cartStore.shopcartItems"
          :key="item.id"
          class="box is-shadowless"
        >
          <div class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <nuxt-img :src="item.imageUrl[0]" alt="" />
              </figure>
            </div>
            <div class="content has-text-left">
              <button
                class="button is-text is-underlineless remove is-pulled-right"
                :class="{ 'is-loading': item.isLoading }"
                @click="deleteCartData(index)"
              >
                &times;
              </button>
              <p class="item-name is-sizs-6">
                {{ item.title }}
              </p>
              <div v-if="item.price" class="price has-text-righted">
                {{ toCash(item.price) }}
              </div>
              <div class="field has-addons has-addons-centered">
                <div class="control">
                  <button
                    class="button is-left is-small"
                    @click="countQuantity(index, 'm')"
                    :disabled="quantityMinest(index)"
                  >
                    &minus;
                  </button>
                </div>
                <div class="control">
                  <input
                    type="number"
                    class="input has-text-centered is-small"
                    v-model="item.quantity"
                    @change="updateCartData(index)"
                  />
                </div>
                <div class="control">
                  <button
                    class="button is-right is-small"
                    @click="countQuantity(index, 'p')"
                  >
                    &plus;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="total">小計: {{ toCash(countAll) }}</div>
      </div>
      <div
        class="shopcart-checkout buttons is-fullwidth is-right-desktop is-center-mobile"
      >
        <button
          class="button is-light continueshop"
          @click="(_) => navigateTo('products')"
        >
          &lsaquo;&lsaquo;&nbsp;繼續購物
        </button>
        <button
          class="button is-primary checkout"
          @click="(_) => navigateTo('checkout')"
        >
          去結帳 &rsaquo;&rsaquo;
        </button>
      </div>
    </div>
    <cart-no-item v-else />
    <div class="container">
      <random-recommends title="精選推薦" type="all" />
    </div>
  </section>
</template>
<style lang="scss" scoped>
.table {
  th {
    text-align: center;
  }
  td {
    width: 15%;
    padding: 1rem;
    text-align: center;
    vertical-align: middle;
  }
}

.price {
  width: 100%;
  text-align: left;
  font-weight: 500;
  span.strike {
    margin-left: 1%;
    font-size: 12px;
    text-decoration: line-through;
    color: #888;
  }
  &.in-bottom {
    margin-top: auto;
  }
}

.checkout {
  &:hover {
    background: $hnavyblue;
  }
  &:hover a {
    color: $lightgray;
  }
}

.continueshop {
  background: $lightgray;
  color: $navyblue;
  &:hover {
    background: $lightgray;
    color: $hnavyblue;
    &:hover a {
      color: $hnavyblue;
    }
  }
}

// shopcart component
.media-left {
  margin: auto 1rem auto 0;
}
.is-cus-centered {
  text-align: center;
}
.action {
  text-align: right;
}
.is-right-desktop {
  @include desktop {
    justify-content: flex-end;
  }
}
.is-center-mobile {
  @include mobile {
    justify-content: center;
  }
}
.mobile {
  .total {
    text-align: right;
    margin-right: 5%;
  }
}
</style>
