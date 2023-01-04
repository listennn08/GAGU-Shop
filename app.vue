<script setup lang="ts">
import cookies from './cookies'
import { AuthService } from './services/domain/auth'
import { ProductService } from './services/domain/product'
import { AuthClient, ProductClient } from './services/infra'
import { useLoginStore } from './store/loginStore'
import { useProductStore } from './store/productStore'

const route = useRoute()
const loginStore = useLoginStore()
const auth = AuthService(AuthClient())

const productStore = useProductStore()
const productService = ProductService(ProductClient())
const getData = async () => {
  try {
    productStore.loading = true
    const resp = await productService.getAllProducts()
    productStore.setProducts(resp.products)
    productStore.pagination = reactive({ ...resp.pagination })
  } catch (e) {
    console.log(e)
    // store.setMsg({
    //   msg: '載入失敗，請重新載入頁面',
    //   type: false,
    // })
  } finally {
    productStore.loading = false
  }
}

if (!route.path.includes('products')) useAsyncData(getData)
if (!route.path.includes('shopcart')) useCart()

onBeforeMount(async () => {
  try {
    loginStore.toggleChecking()
    await auth.checkLoginStatus()
    loginStore.setLoginInfo(cookies.getItem('token')!)
  } catch {
  } finally {
    loginStore.toggleChecking()
  }
})
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style lang="scss">
html,
body {
  /* height: 100vh; */
  min-height: 100vh;
}
#app {
  font-family: 'Noto Sanc TC', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 100vh;
}
</style>
