<script setup lang="ts">
import { usePrimeVue } from '@primevue/core'

const $primevue = usePrimeVue()

console.log($primevue.config.theme)
</script>
<template>
  <div class="min-h-screen">
    <div class="pt-16 min-h-screen overflow-hidden">
      <slot />
      <p-toast />
    </div>
    <Navbar type="admin" />
  </div>
</template>
<style lang="scss" scoped></style>
