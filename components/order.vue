<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useOrderStore } from '~~/store/orderStore'
import { payOrder } from '~~/services/frontend'
import { useAppStore } from '~~/store/appStore'
import { OrderService } from '~~/services/domain/order'
import { OrderClient } from '~~/services/infra'

const route = useRoute()
const appStore = useAppStore()
const toast = useToast()
const { t } = useI18n()
const orderStore = useOrderStore()
const orderService = OrderService(OrderClient())

const paidStatus = computed(() =>
  orderStore.order.paid
    ? { status: 'text-green-500', msg: '已付款' }
    : { status: 'text-red-500', msg: '未付款' },
)

const isPaying = ref(false)
const doPay = async (id: string) => {
  try {
    isPaying.value = true
    const resp = await payOrder(id)
    orderStore.setOrder(resp.data.data)
    toast.add({
      severity: 'success',
      summary: t('toast.success'),
      detail: t('checkout.pay-success'),
    })
    appStore.setCurrentStep(3)
    navigateTo(`/paysuccess/${resp.data.data.id}`)
  } catch {
    toast.add({
      severity: 'error',
      summary: t('toast.error'),
      detail: t('checkout.pay-error'),
    })
  } finally {
    isPaying.value = false
  }
}

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
  <section class="max-w-screen-md mx-auto">
    <shop-list
      :products="order?.products ?? []"
      :loading="status === 'pending'"
      :count-all="countAll"
    />
    <h4 class="h4t has flex items-center">
      <i class="icon i-fa-solid-info-circle" />
      &nbsp; 訂單資訊
    </h4>
    <table class="" v-if="order?.user">
      <tr>
        <td align="center">姓名</td>
        <td align="center">{{ order?.user.name }}</td>
      </tr>
      <tr>
        <td align="center">電話</td>
        <td align="center">{{ hideTel(order?.user.tel) }}</td>
      </tr>
      <tr>
        <td align="center">信箱</td>
        <td align="center">{{ order?.user.email }}</td>
      </tr>
      <tr>
        <td align="center">地址</td>
        <td align="center">{{ order?.user.address }}</td>
      </tr>
      <tr>
        <td align="center">付款方式</td>
        <td align="center">{{ order?.payment }}</td>
      </tr>
      <tr>
        <td align="center">付款狀態</td>
        <td
          align="center"
          class="has-text-weight-bold"
          :class="paidStatus.status"
        >
          {{ paidStatus.msg }}
        </td>
      </tr>
    </table>
    <p-button v-if="!order?.paid" @click="doPay(order.id)" :loading="isPaying">
      {{ t('checkout.confirm-payment') }}
    </p-button>
  </section>
</template>
