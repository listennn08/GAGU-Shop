<script setup lang="ts">
import { useAppStore } from '~~/store/appStore'

const drop = ref(false)
const store = useAppStore()
const toggleDrop = (toggle: boolean | MouseEvent) => {
  if (typeof toggle === 'boolean') {
    drop.value = toggle
  } else {
    drop.value = !drop.value
  }
}
</script>
<template>
  <nav
    class="hero-head has-background-light"
    :class="{ 'is-fixed-top': store.sticky }"
  >
    <div class="columns is-mobile is-marginless">
      <div class="column left" @click.stop="toggleDrop(false)">
        <h1 class="is-size-2 has-text-weight-bold">
          <NuxtLink class="logo" to="/">GAGU</NuxtLink>
        </h1>
      </div>
      <div class="column center desktop">
        <NuxtLink class="navbar-item" to="/about">
          {{ $t('about') }}
        </NuxtLink>
        <NuxtLink class="navbar-item" to="/products">
          {{ $t('product') }}
        </NuxtLink>
        <NuxtLink class="navbar-item" to="/shopcart">
          {{ $t('cart') }}
        </NuxtLink>
        <NuxtLink class="navbar-item" to="/orders">
          {{ $t('order') }}
        </NuxtLink>
      </div>
      <div class="column right">
        <slot />
        <div class="dropdown is-right mobile" :class="{ 'is-active': drop }">
          <div class="dropdown-trigger" @click.stop="toggleDrop">
            <button
              class="button is-text"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
            >
              <i class="icon is-small i-fa-solid-bars" />
            </button>
          </div>
          <div id="dropdown-menu" class="dropdown-menu" role="menu">
            <div class="dropdown-content" @click.stop="toggleDrop">
              <NuxtLink class="dropdown-item" to="/about">
                {{ $t('about') }}
              </NuxtLink>
              <NuxtLink class="dropdown-item" to="/products">
                {{ $t('product') }}
              </NuxtLink>
              <NuxtLink class="dropdown-item" to="/shopcart">
                {{ $t('cart') }}
              </NuxtLink>
              <NuxtLink class="dropdown-item" to="/orders">
                {{ $t('order') }}
              </NuxtLink>
              <hr class="dropdown-divider" />
              <slot name="dropdown" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<style lang="scss" scoped>
.is-fixed-top {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 5;
}
.hero-head {
  .router-link-exact-active:not(.logo) {
    color: $goldyellow;
  }
  .column {
    padding: 0 0.75rem;
  }
}

:deep(.navbar-item) {
  padding: 0 0.75rem;
  color: $navyblue;
  &::after {
    content: '';
    position: absolute;
    height: 0;
    bottom: 0;
    border-bottom: 1px solid $goldyellow;
    transition: 0.3s;
  }
  &:hover {
    color: $goldyellow;
    background: none;
  }
  &:focus {
    color: $goldyellow;
    background: none;
  }
  &::after {
    left: 10%;
    right: 90%;
  }
  &:hover::after {
    right: 10%;
  }
}

:deep(.dropdown-item) {
  padding: 0.375rem 3rem;
}
</style>
