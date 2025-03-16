<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useCartStore } from '~~/store/cartStore'

const { t } = useI18n()
const cartStore = useCartStore()
const { itemTotal, deleteCartData } = await useCart()

const columns = computed(() => [
  { field: 'index', header: '#', width: '50px' },
  { field: 'imageUrl', header: t('shop-cart.image'), width: '100px' },
  { field: 'title', header: t('shop-cart.title'), width: '200px' },
  { field: 'price', header: t('shop-cart.price'), width: '100px' },
  { field: 'quantity', header: t('shop-cart.quantity'), width: '100px' },
  { field: 'total', header: t('shop-cart.total'), width: '100px' },
  { field: 'remove', header: t('shop-cart.remove'), width: '50px' },
])
</script>
<template>
  <div class="max-w-screen-lg mx-auto mb-4">
    <p-data-table
      :value="cartStore.shopCartItems"
      :loading="cartStore.loading"
      class="mb-4"
    >
      <template #header>
        <div class="flex justify-end">
          <p-button
            v-if="cartStore.shopCartItems?.length > 0"
            :label="$t('shop-cart.delete-all')"
            outlined
            @click="deleteCartData"
          />
        </div>
      </template>

      <template #empty>
        <div class="container flex flex-col items-center justify-center mb-8">
          <div class="p-4 m-4 text-2xl font-bold">
            {{ $t('shop-cart.no-cart-items') }}
          </div>
        </div>
      </template>

      <p-column
        v-for="column in columns"
        :key="column.field"
        :field="column.field"
        :header="column.header"
        class="align-middle"
        :pt="{
          header: {
            style: {
              width: column.width,
            },
          },
        }"
      >
        <template #body="{ data, index }">
          <template v-if="column.field === 'index'">
            {{ index + 1 }}
          </template>

          <template v-else-if="column.field === 'imageUrl'">
            <nuxt-img
              :src="data[column.field][0]"
              width="128"
              height="128"
              alt=""
            />
          </template>

          <template v-else-if="column.field === 'price'">
            <div class="price" v-if="data[column.field]">
              {{ toCash(data[column.field]) }}
            </div>
          </template>

          <template v-else-if="column.field === 'quantity'">
            <p-input-number
              v-model="data[column.field]"
              :min="1"
              show-buttons
              button-layout="horizontal"
              input-class="text-center"
            >
              <template #decrementbuttonicon>
                <span class="pi pi-minus" />
              </template>
              <template #incrementbuttonicon>
                <span class="pi pi-plus" />
              </template>
            </p-input-number>
          </template>

          <template v-else-if="column.field === 'total'">
            <div class="price in-bottom">
              {{ itemTotal(index) }}
            </div>
          </template>

          <template v-else-if="column.field === 'remove'">
            <p-button
              severity="danger"
              rounded
              text
              @click="deleteCartData(index)"
            >
              &times;
            </p-button>
          </template>

          <template v-else>
            {{ data[column.field] }}
          </template>
        </template>
      </p-column>
    </p-data-table>

    <div class="flex justify-center gap-x-4 mb-12">
      <p-button
        :label="$t('shop-cart.continue-shopping')"
        icon="pi pi-angle-double-left"
        icon-pos="left"
        outlined
        @click="navigateTo('products')"
      />
      <p-button
        v-if="cartStore.shopCartItems?.length > 0"
        :label="$t('shop-cart.checkout')"
        icon="pi pi-angle-double-right"
        icon-pos="right"
        @click="navigateTo('checkout')"
      />
    </div>

    <random-recommends :title="$t('recommend')" type="all" />
  </div>
</template>
