<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const drop = ref(false)
const toggleDrop = () => (drop.value = !drop.value)

const items = [
  { label: t('manage.product'), route: '/admin/products' },
  { label: t('manage.coupon'), route: '/admin/coupons' },
  { label: t('manage.order'), route: '/admin/orders' },
  { label: t('manage.image'), route: '/admin/files' },
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
        class: 'fixed top-0 inset-x-0 !bg-primary',
      },
      item: {
        class: 'navbar-item',
      },
    }"
  >
    <template #start>
      <h1>
        <nuxt-link to="/" class="logo !text-light">
          GAGU<small class="text-xs">Management</small>
        </nuxt-link>
      </h1>
    </template>
    <template #item="{ item }">
      <nuxt-link class="navbar-item !text-light" :to="item.route">
        {{ item.label }}
      </nuxt-link>
    </template>
    <template #end>
      <slot />
    </template>
  </p-menubar>
</template>
