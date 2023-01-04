<script lang="ts" setup>
import { useProductStore } from '~~/store/productStore'
import { ProductClient } from '~~/services/infra'
import { ProductService } from '~~/services/domain/product'

const productStore = useProductStore()
const productService = ProductService(ProductClient())
const getData = async () => {
  if (productStore.loading || productStore.products.length > 0) return
  try {
    const resp = await productService.getAllProducts()
    productStore.setProducts(resp.products)
    productStore.pagination = reactive({ ...resp.pagination })
  } catch (e) {
    console.log(e)
  }
}

const { pending } = await useAsyncData(getData)

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
  <!-- if use v-if will throw error, I think is server render and client render issue -->
  <loader v-show="pending" />
  <article class="container is-fullheight">
    <category-list />
    <product-list />
  </article>
</template>

<style scoped></style>
