<script lang="ts" setup>
const drop = ref(false)
const toggleDrop = () => (drop.value = !drop.value)
</script>
<template>
  <nav class="hero-head">
    <div class="columns is-mobile is-marginless">
      <div class="column left">
        <h1 class="is-size-2 has-text-weight-bold text-light">
          <NuxtLink
            class="logo text-light hover:text-light-50 ml-2"
            to="/admin"
          >
            GAGU
          </NuxtLink>
          <small class="is-size-6"> Management </small>
        </h1>
      </div>
      <div class="column center desktop">
        <NuxtLink class="navbar-item" to="/admin/products">
          {{ $t('manage.product') }}
        </NuxtLink>
        <NuxtLink class="navbar-item" to="/admin/coupons">
          {{ $t('manage.coupon') }}
        </NuxtLink>
        <NuxtLink class="navbar-item" to="/admin/orders">
          {{ $t('manage.order') }}
        </NuxtLink>
        <NuxtLink class="navbar-item" to="/admin/files">
          {{ $t('manage.image') }}
        </NuxtLink>
      </div>
      <div class="column right">
        <slot />
        <div class="dropdown is-right mobile" :class="{ 'is-active': drop }">
          <div class="dropdown-trigger" @click="toggleDrop">
            <button
              class="button is-dark"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
            >
              <i class="icon is-small i-fa-solid-bars" />
            </button>
          </div>
          <div id="dropdown-menu" class="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <NuxtLink class="dropdown-item" to="/admin/products">
                商品管理
              </NuxtLink>
              <NuxtLink class="dropdown-item" to="/admin/coupons"
                >優惠管理</NuxtLink
              >
              <NuxtLink class="dropdown-item" to="/admin/orders"
                >訂單管理</NuxtLink
              >
              <NuxtLink class="dropdown-item" to="/admin/files"
                >圖片管理</NuxtLink
              >
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
.hero-head {
  background: $navyblue;
  font-family: 'Noto Sans TC', sans serif;
  .router-link-exact-active:not(.logo) {
    color: $goldyellow;
  }
  .column {
    padding: 0 0.75rem;
  }
}
:deep(.navbar-item) {
  padding: 0 0.75rem;
  color: $lightgray;
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
.dropdown,
.dropdown-menu,
.dropdown-content {
  background: $navyblue;
}
:deep(.dropdown-item) {
  padding: 0.375rem 3rem;
  color: $lightgray;
}
.is-dark {
  background: $navyblue;
  &:hover,
  &:focus {
    background: $hnavyblue;
  }
}
</style>
