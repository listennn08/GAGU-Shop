<script lang="ts" setup>
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { getAllOrders } from '~~/services/frontend'
import { useOrderStore } from '~~/store/orderStore'

const toast = useToast()
const { t } = useI18n()
const orderStore = useOrderStore()
const loading = ref(false)
const pagination = reactive({
  page: 1,
  paged: 10,
  orderBy: 'created_at',
  total: 1,
})
async function fetchOrders() {
  try {
    loading.value = true
    const resp = await getAllOrders(
      pagination.page,
      pagination.paged,
      pagination.orderBy,
    )
    pagination.total = resp.data.meta.pagination.total
    orderStore.setOrders(
      resp.data.data.map((el: any) => ({
        ...el,
        collapse: false,
      })),
    )
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: t('toast.error'),
      detail: t('toast.loading_failed'),
    })
    console.error(err)
  } finally {
    loading.value = false
  }
}

const expandedRows = ref<Record<string, boolean>>({})

function toggleCollapse(id: string) {
  if (!expandedRows.value[id]) {
    expandedRows.value = {
      ...expandedRows.value,
      [id]: true,
    }
  } else {
    delete expandedRows.value[id]
  }
}

function onPage(e: any) {
  pagination.page = e.page + 1
  fetchOrders()
}

await useAsyncData('orders', fetchOrders)
</script>

<template>
  <div class="py-4 max-w-screen-lg mx-auto min-h-app-screen">
    <p-data-table
      :value="orderStore.orders"
      data-key="id"
      :loading="loading"
      :expanded-rows="expandedRows"
    >
      <template #empty>
        {{ $t('order.no-orders') }}
      </template>

      <p-column field="id" :header="$t('order.order-number')">
        <template #body="{ data }">
          <div class="flex flex-col items-start">
            <nuxt-link
              :to="`/order/${data.id}`"
              :title="data.id"
              class="overflow-hidden text-ellipsis mb-2 text-sm"
            >
              {{ data.id.slice(0, 10) }}
            </nuxt-link>
            <p-button
              :label="$t('order.details')"
              :icon="`pi pi-${expandedRows[data.id] ? 'minus' : 'plus'}`"
              severity="info"
              variant="link"
              size="small"
              @click="toggleCollapse(data.id)"
            />
          </div>
        </template>
      </p-column>
      <p-column field="created.datetime" :header="$t('order.date')">
        <template #body="{ data }">
          {{ dayjs(data.created.datetime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </p-column>
      <p-column field="status" :header="$t('order.status')">
        <template #body="{ data }">
          {{ $t(`order-status.created`) }}
        </template>
      </p-column>
      <p-column field="amount" :header="$t('order.amount')">
        <template #body="{ data }">
          {{ toCash(data.amount) }}
        </template>
      </p-column>
      <p-column field="payment" :header="$t('order.payment-method')">
      </p-column>
      <p-column field="payment-status" :header="$t('order.payment-status')">
        <template #body="{ data }">
          <p-tag :severity="data.paid ? 'success' : 'danger'">
            {{
              data.paid
                ? $t('payment-status.paid')
                : $t('payment-status.unpaid')
            }}
          </p-tag>
        </template>
      </p-column>
      <template #expansion="{ data }">
        <p-data-table :value="data.products" :rows="10" :paginator="false">
          <p-column field="product.title" :header="$t('order.product-name')" />
          <p-column field="quantity" :header="$t('order.quantity')" />
          <p-column field="product.price" :header="$t('order.unit-price')">
            <template #body="{ data }">
              {{ toCash(data.product.price) }}
            </template>
          </p-column>
        </p-data-table>
      </template>
    </p-data-table>
    <p-paginator
      :total-records="pagination.total"
      :rows="pagination.paged"
      :rows-per-page-options="[10, 25, 50, 100]"
      @page="onPage"
    />
  </div>
</template>
