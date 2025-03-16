<script lang="ts" setup>
import { useAppStore } from '~/store/appStore'
import { useOrderStore } from '~~/store/orderStore'
import { OrderService } from '~~/services/domain/order'
import { OrderClient } from '~~/services/infra'

const route = useRoute()
const appStore = useAppStore()
const orderStore = useOrderStore()
const orderService = OrderService(OrderClient())

const { data: order, status } = await useAsyncData(
  async () => {
    try {
      const { id } = route.params
      const resp = await orderService.getOrder(id as string)
      appStore.setCurrentStep(orderStore.order.paid ? 3 : 2)
      console.log(resp)
      return resp
    } catch (err: any) {
      console.log(err)
    }
  },
  { server: false },
)

const countAll = computed(
  () =>
    order.value?.products.reduce(
      (acc: number, curr: any) => acc + curr.price * curr.quantity,
      0,
    ) ?? 0,
)

onBeforeUnmount(() => {
  orderStore.setOrder({})
})
</script>

<template>
  <section class="py-4">
    <shop-list
      :products="order?.products ?? []"
      :loading="status === 'pending'"
      :count-all="countAll"
    />
    <order-form :order="order" />
  </section>
</template>
