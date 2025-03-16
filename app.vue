<script setup lang="ts">
import { AuthService } from './services/domain/auth'
import { AuthClient } from './services/infra'
import { useLoginStore } from './store/loginStore'

const loginStore = useLoginStore()
const auth = new AuthService(AuthClient())

onBeforeMount(async () => {
  try {
    loginStore.toggleChecking()
    await auth.checkLoginStatus()
    loginStore.setLoginInfo(localStorage.getItem('token')!)
  } catch (e) {
    console.log(e)
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
<style>
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
