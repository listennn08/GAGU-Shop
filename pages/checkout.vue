<script lang="ts" setup>
import { useCartStore } from '~~/store/cartStore'
import { useDiscount } from '~~/composables/useDiscount'

const {
  shopCartItems: products,
  loading,
  countAll,
} = storeToRefs(useCartStore())

const discountStore = useDiscount()
const { discountType, discountMsg, code } = storeToRefs(discountStore)
const couponUseful = computed(() =>
  discountType.value ? 'has-text-success' : 'has-text-danger',
)
</script>

<template>
  <section class="py-4">
    <steps />
    <shop-list :products="products" :loading="loading" :count-all="countAll" />
    <div class="flex justify-end">
      <p-input-group class="!md:w-1/3">
        <p-input-group-addon>
          <i class="pi pi-tag" />
        </p-input-group-addon>
        <p-input-text
          v-model="code"
          :placeholder="$t('checkout.coupon-placeholder')"
        />
        <p-input-group-addon>
          <p-button variant="text" @click="discountStore.handleCheckCoupon">
            Apply
          </p-button>
        </p-input-group-addon>
      </p-input-group>
    </div>
    <div>
      <div class="has-text-right" v-if="code">
        <p v-if="code" :class="couponUseful">
          {{ discountMsg }}
        </p>
      </div>
    </div>
    <order-form />
  </section>
  <!-- <vue-confirm-dialog /> -->
</template>

<style scoped></style>
