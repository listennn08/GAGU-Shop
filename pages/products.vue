<script lang="ts" setup>
import { useProductStore } from '~~/store/productStore'
import { ProductClient } from '~~/services/infra'
import { ProductService } from '~~/services/domain/product'
import { useI18n } from 'vue-i18n'
import type { MenuItemCommandEvent } from 'primevue/menuitem'

const { t } = useI18n()
const router = useRouter()
const productStore = useProductStore()
const productService = ProductService(ProductClient())
async function getData() {
  if (productStore.loading || productStore.products.length > 0) return
  try {
    const resp = await productService.getAllProducts()
    productStore.setProducts(resp.products)
    productStore.pagination = reactive({ ...resp.pagination })
  } catch (e) {
    console.log(e)
  }
}

await useAsyncData(getData)

const pt = reactive({
  root: {
    class: 'flex',
  },
})

const categoryMap = reactive<string[]>([
  'all',
  'bed',
  'chair',
  'lamp',
  'sofa',
  'bookcase',
  'cabinet',
  'wardrobe',
  'table',
  'curtain',
])
const categoryList = categoryMap.map((key) => ({
  label: t(`product.${key}`),
  value: key,
  command: ({ item }: MenuItemCommandEvent) => {
    router.push(`/products?category=${item.value}`)
  },
}))

watch(productStore.pagination, async (cur, old) => {
  if (cur.current_page === old.current_page) return
  try {
    const resp = await productService.getAllProducts(cur.current_page)
    productStore.setProducts(resp.products)
  } catch (e) {
    console.error(e)
  } finally {
  }
})
</script>

<template>
  <p-fluid :pt>
    <div class="ml-50 flex-1 min-h-app-screen">
      <product-list />
    </div>
    <p-menu
      :pt="{
        root: {
          class: 'fixed top-15 inset-y-0',
          style: {
            '--p-menu-border-radius': '0px',
          },
        },
      }"
      :model="categoryList"
      :fluid="false"
    />
  </p-fluid>
</template>

<style scoped></style>
