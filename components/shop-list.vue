<script setup lang="ts">
import { useCartStore } from '~~/store/cartStore'

const props = defineProps<{
  products: any[]
  loading: boolean
  countAll: number
}>()
const isCollapse = ref(false)

const showCollapseButton = computed(() =>
  props.products ? props.products.length > 2 : false,
)
function toggleCollapse() {
  isCollapse.value = !isCollapse.value
}
const maxRows = computed(() => (isCollapse.value ? props.products.length : 2))
</script>
<template>
  <div>
    <h4 class="text-lg font-bold border-b border-black border-solid mb-2">
      <i class="pi pi-clipboard" />
      <span>{{ $t('shop-cart.shop-list') }}</span>
    </h4>
    <p-data-view :loading="loading" :value="products" data-key="id">
      <template #empty>
        <div
          v-if="loading"
          class="flex justify-center items-center h-full py-4"
        >
          <p-progress-spinner
            style="width: 3rem; height: 3rem"
            stroke-width="4"
          />
        </div>
        <div v-else class="text-center py-4">
          {{ $t('checkout.no-items') }}
        </div>
      </template>
      <template #list="{ items }">
        <div
          v-for="prod in items.slice(0, maxRows)"
          :key="prod.id"
          class="grid grid-cols-4 gap-2 px-3 py-4"
        >
          <div>
            <nuxt-img
              :src="prod.imageUrl?.[0]"
              height="128px"
              v-slot="{ src, isLoaded, imgAttrs }"
            >
              <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />
              <p-skeleton v-else height="128px" width="128px" />
            </nuxt-img>
          </div>
          <div>{{ prod.title }}</div>
          <div>x{{ prod.quantity }}</div>
          <div>{{ toCash(prod.price) }}</div>
        </div>
      </template>

      <template v-if="products?.length" #footer>
        <div class="grid grid-cols-4 gap-2">
          <div class="col-start-4 text-lg font-bold">
            {{ $t('shop-cart.total') }} {{ toCash(countAll) }}
          </div>
        </div>
      </template>
    </p-data-view>

    <div v-if="showCollapseButton" class="text-center">
      <p-button
        variant="text"
        :icon="`pi pi-angle-${isCollapse ? 'up' : 'down'}`"
        @click="toggleCollapse"
      />
    </div>
  </div>
</template>
