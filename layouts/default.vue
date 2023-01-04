<script setup lang="ts">
import { useAppStore } from '~~/store/appStore'

const store = useAppStore()
const handleScroll = () => {
  if (window.scrollY > 100) store.toggleSticky(true)
  else store.toggleSticky(false)
}

const toggleOpen = () => store.toggleMenuOpen(false)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
<template>
  <div class="min-h-screen">
    <Navbar />
    <div class="home" @click="toggleOpen()">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.home {
  min-height: calc(100vh - 162px);
  padding-bottom: 2rem;
  overflow-x: hidden;
}
.footer {
  position: sticky;
  height: 100px;
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.view {
  min-height: 78vh;
}
</style>
