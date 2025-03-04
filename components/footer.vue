<script setup lang="ts">
import type { MenuMethods } from 'primevue/menu'

const locale = useLocalStorage('locale', '')
const menu = ref<MenuMethods>()
const localeOptions = [
  {
    label: '繁體中文',
    command: () => {
      locale.value = 'tw'
    },
  },
  {
    label: 'English',
    command: () => {
      locale.value = 'en'
    },
  },
]
</script>
<template>
  <footer class="relative bg-gray-100 py-8 flex px-12 justify-between">
    <div class="flex items-center justify-center gap-x-4">
      <div>
        &copy; {{ new Date().getFullYear() }} | &nbsp;
        <small class="self-center">GAGU Shop</small>
      </div>
      <a
        class="flex items-center i-fa-brands-instagram"
        href="https://github.com/listennn08"
        target="_blank"
      />
      <a
        class="flex items-center i-fa-brands-facebook"
        href="https://github.com/listennn08"
        target="_blank"
      />
      <a
        class="flex items-center i-fa-brands-github"
        href="https://github.com/listennn08"
        target="_blank"
      />
    </div>
    <div>
      <p-button
        variant="link"
        icon="pi pi-language"
        aria-haspopup="true"
        aria-controls="locale-menu"
        @click="menu?.toggle($event)"
      />
      <p-menu ref="menu" :model="localeOptions" :popup="true"> </p-menu>
    </div>
  </footer>
</template>
