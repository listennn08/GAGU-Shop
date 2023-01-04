<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { useOrderStore } from '~~/store/orderStore'
import { payOrder } from '~~/services/frontend'
import { useAppStore } from '~~/store/appStore'
import { OrderService } from '~~/services/domain/order'
import { OrderClient } from '~~/services/infra'

const route = useRoute()
const appStore = useAppStore()
const orderStore = useOrderStore()
const orderService = OrderService(OrderClient())

const paidStatus = computed(() =>
  orderStore.order.paid
    ? { status: 'has-text-success', msg: '已付款' }
    : { status: 'has-text-danger', msg: '未付款' },
)

const doPay = async (id: string) => {
  try {
    appStore.toggleLoading()
    const resp = await payOrder(id)
    orderStore.setOrder(resp.data.data)
    appStore.setMsg({
      msg: '付款完成！',
      type: true,
    })
    appStore.setCurrentStep(3)
    // navigateTo(`/paysuccess/${resp.data.data.id}`);
  } catch {
    appStore.setMsg({
      msg: '付款失敗！',
      type: false,
    })
  } finally {
    appStore.toggleLoading()
  }
}

const { pending } = await useAsyncData(
  async () => {
    try {
      const { id } = route.params
      const resp = await orderService.getOrder(id as string)
      orderStore.setOrder(resp)
      appStore.setCurrentStep(orderStore.order.paid ? 3 : 2)
    } catch (err: any) {
      console.log(err)
    }
  },
  { server: false },
)

onBeforeUnmount(() => {
  orderStore.setOrder({})
})
</script>

<template>
  <loader v-show="pending" />
  <div v-if="!pending" class="p-12 text-center">
    <shop-list :products="orderStore.order.products" />
    <h4 class="h4t has-text-left flex items-center">
      <i class="icon i-fa-solid-info-circle" />
      &nbsp; 訂單資訊
    </h4>
    <table class="table is-fullwidth" v-if="orderStore.order.user">
      <tr>
        <td align="center">姓名</td>
        <td align="center">{{ orderStore.order.user.name }}</td>
      </tr>
      <tr>
        <td align="center">電話</td>
        <td align="center">{{ hideTel(orderStore.order.user.tel) }}</td>
      </tr>
      <tr>
        <td align="center">信箱</td>
        <td align="center">{{ orderStore.order.user.email }}</td>
      </tr>
      <tr>
        <td align="center">地址</td>
        <td align="center">{{ orderStore.order.user.address }}</td>
      </tr>
      <tr>
        <td align="center">付款方式</td>
        <td align="center">{{ orderStore.order.payment }}</td>
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
    <button
      class="button is-primary"
      :class="{ 'is-loading': appStore.loading }"
      v-if="!orderStore.order.paid"
      @click="doPay(orderStore.order.id)"
    >
      確認付款
    </button>
  </div>
</template>

<style scoped lang="scss">
.list {
  overflow: hidden;
  &.hide {
    max-height: 450px;
    @include pad {
      max-height: 300px;
    }
    @include mobile-large {
      max-height: 190px;
    }
    @include mobile {
      max-height: 200px;
    }
    @include xxs {
      max-height: 210px;
    }
  }
}

section {
  padding: 20px 0 100px;
}
</style>
