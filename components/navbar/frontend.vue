<script setup lang="ts">
import { useAppStore } from '~~/store/appStore'
import { useI18n } from 'vue-i18n'
const drop = ref(false)
const { t } = useI18n()
const store = useAppStore()
const toggleDrop = (toggle: boolean | MouseEvent) => {
  if (typeof toggle === 'boolean') {
    drop.value = toggle
  } else {
    drop.value = !drop.value
  }
}

const items = [
  { label: t('menu.about'), route: '/about' },
  { label: t('menu.product-list'), route: '/products' },
  { label: t('menu.cart'), route: '/shop-cart' },
  { label: t('menu.order'), route: '/orders' },
]
</script>

<template>
  <p-menubar
    :model="items"
    :pt="{
      root: {
        style: {
          '--p-menubar-gap': '2rem',
        },
        class: '!fixed top-0 inset-x-0',
      },
      item: {
        class: 'navbar-item',
      },
    }"
  >
    <template #start>
      <h1><nuxt-link to="/" class="logo">GAGU</nuxt-link></h1>
    </template>
    <template #item="{ item }">
      <nuxt-link class="navbar-item" :to="item.route">
        {{ item.label }}
      </nuxt-link>
    </template>

    <template #end>
      <slot />
    </template>
  </p-menubar>
</template>

<style scoped>
.navbar-item.router-link-active {
  @apply text-primary/90;
}
</style>
