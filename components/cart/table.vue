<script setup lang="ts">
import { ICartProduct } from '~~/store/cartStore'

defineProps<{
  shopcartItems: ICartProduct[]
  countQuantity: (i: number, ope: string) => void
  quantityMinest: (i: number) => boolean
  updateCartData: (i: number) => void
  itemTotal: (i: number) => number
  deleteCartData: (i: number) => Promise<void>
  countAll: number
}>()
</script>

<template>
  <table class="table is-fullwidth desktop">
    <thead>
      <th class="text-center">編號</th>
      <th class="text-center">圖示</th>
      <th class="text-center">產品名稱</th>
      <th class="text-center">售價</th>
      <th class="text-center">購買數量</th>
      <th class="text-center">總價</th>
      <th class="text-center">移除</th>
    </thead>
    <tbody ref="preivew">
      <tr v-for="(item, index) in shopcartItems" :key="item.id">
        <td class="is-vcentered" scoped="row">
          {{ index + 1 }}
        </td>
        <td class="is-cus-centered">
          <figure class="image is-128x128">
            <nuxt-img :src="item.imageUrl[0]" />
          </figure>
        </td>
        <td class="is-vcentered">
          <div class="item-name">
            {{ hideTitle(item.title) }}
          </div>
        </td>
        <td class="is-vcentered">
          <div class="price has-text-centered" v-if="item.price">
            {{ toCash(item.price) }}
            <span :class="{ strike: item.price }">
              {{ toCash(item.origin_price) }}
            </span>
          </div>
        </td>
        <td class="is-vcentered">
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
        </td>
        <td class="item-total is-vcentered">
          {{ toCash(itemTotal(index)) }}
        </td>
        <td class="is-vcentered">
          <button
            class="button is-text is-underlineless remove"
            :class="{ 'is-loading': item.isLoading }"
            @click="deleteCartData(index)"
          >
            &times;
          </button>
        </td>
      </tr>
      <tr class="total">
        <td>小計</td>
        <td colspan="4"></td>
        <td>{{ toCash(countAll) }}</td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>
