<script lang="ts" setup>
import { getAllOrders } from '~~/services/frontend'
import { useOrderStore } from '~~/store/orderStore'

const orderStore = useOrderStore()
const loadOrders = async () => {
  // const loader = this.$loading.show();
  try {
    const resp = await getAllOrders()
    orderStore.setOrders(
      resp.data.data.map((el: any) => ({
        ...el,
        collapse: false,
      })),
    )
    // loader.hide();
  } catch (err) {
    // this.setMsg({
    //   msg: err.response.message,
    //   type: false,
    // });
    // loader.hide();
  }
}
const toggleCollapse = (index: number) => {
  if (orderStore.orders[index].collapse)
    orderStore.orders[index].collapse = false
  else orderStore.orders[index].collapse = true
}

const collapseProduct = (index: number) =>
  `i-${orderStore.orders[index]?.collapse ? 'fa-solid-minus' : 'fa-solid-plus'}`
const paidStatus = (paid: boolean) =>
  paid
    ? { status: 'has-text-success', msg: '已付款' }
    : { status: 'has-text-danger', msg: '未付款' }
const itemTotal = (index: number, pIndex: number) => {
  const { product, quantity } = orderStore.orders[index].products[pIndex]
  return product.price
    ? product.price * quantity
    : product.origin_price * quantity
}

onBeforeMount(loadOrders)
</script>

<template>
  <section class="p-12">
    <div class="container">
      <div
        class="columns is-marginless is-multiline"
        v-for="(order, index) in orderStore.orders"
        :key="order.id"
      >
        <div class="column is-full is-vcentered">
          <ul class="menu-list">
            <li>
              <table class="w-full border border-[#dbdbdb]">
                <thead class="border-b border-[#dbdbdb]">
                  <th class="border-r border-[#dbdbdb] p-2" align="center">
                    訂單編號
                  </th>
                  <th class="border-r border-[#dbdbdb] p-2" align="center">
                    日期
                  </th>
                  <th class="border-r border-[#dbdbdb] p-2" align="center">
                    訂單狀態
                  </th>
                  <th class="border-r border-[#dbdbdb] p-2" align="center">
                    總價
                  </th>
                  <th class="p-2" align="center">付款</th>
                </thead>
                <tbody class="min-w-full">
                  <tr class="w-full">
                    <td
                      class="w-1/3 p-2 border-r border-[#dbdbdb]"
                      align="center"
                    >
                      <NuxtLink
                        :to="`/order/${order.id}`"
                        :title="order.id"
                        class="overflow-hidden max-w-50 text-ellipsis"
                      >
                        {{ order.id }}
                      </NuxtLink>
                    </td>
                    <td
                      class="vertical-middle w-1/5 p-2 border-r border-[#dbdbdb]"
                      align="center"
                    >
                      {{ order.created.datetime }}
                    </td>
                    <td
                      class="vertical-middle w-1/7 p-2 border-r border-[#dbdbdb]"
                      align="center"
                    >
                      已建立
                    </td>
                    <td
                      class="vertical-middle w-1/5 p-2 border-r border-[#dbdbdb]"
                      align="center"
                    >
                      {{ toCash(order.amount) }}
                    </td>
                    <td class="vertical-middle w-1/3 p-2" align="center">
                      <div>{{ order.payment }}</div>
                      <div :class="paidStatus(order.paid).status">
                        ({{ paidStatus(order.paid).msg }})
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </li>
            <li class="has-text-left is-marginless">
              <button
                class="button is-text is-small"
                @click="toggleCollapse(index)"
              >
                <span class="icon is-small">
                  <i :class="collapseProduct(index)" />
                </span>
                <span>看明細</span>
              </button>
              <ul :class="{ 'is-hidden': !order.collapse }">
                <li>
                  <table class="w-full">
                    <thead class="border-b border-[#dbdbdb]">
                      <th class="w-2/5 p-2">商品名稱</th>
                      <th class="w-1/3 p-2" align="center">數量</th>
                      <th class="w-1/3 p-2" align="center">總額</th>
                    </thead>
                  </table>
                </li>
                <li
                  v-for="(products, pIndex) in order.products"
                  :key="products.product.id"
                  class="border-b border-[#dbdbdb]"
                >
                  <table class="w-full">
                    <tbody class="w-full">
                      <tr class="w-full">
                        <td class="w-2/5 p-2">{{ products.product.title }}</td>
                        <td class="w-1/3 p-2" align="center">
                          {{ products.quantity + products.product.unit }}
                        </td>
                        <td class="w-1/3 p-2" align="center">
                          {{ toCash(itemTotal(index, pIndex)) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="column is-marginless is-paddingless">
          <hr class="hr" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.col {
  vertical-align: middle;
  text-align: center;
}
</style>
