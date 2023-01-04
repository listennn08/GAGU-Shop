<script setup lang="ts">
import { ICartProduct } from '~~/store/cartStore'

const props = defineProps<{ products: ICartProduct[] }>()
const isCollapse = ref(false)

const collapseIcon = computed(() => (isCollapse.value ? 'up' : 'down'))
const showCollapseButton = computed(() =>
  props.products ? props.products.length > 2 : false,
)
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>
<template>
  <h4 class="h4t has-text-left">
    <i class="icon is-small i-fa-regular-clipboard" />
    <span>&nbsp; 購物清單</span>
  </h4>
  <div class="list" :class="{ hide: !isCollapse }">
    <div
      class="columns is-marginless has-text-centered is-vcentered"
      v-for="prod in products"
      :key="prod.id"
    >
      <div class="column is-paddingless is-marginless is-3 mobile">
        <div class="box is-shadowless py-1 px-2">
          <div class="media">
            <div class="media-left">
              <figure class="image is-64x64 is-inline-block mr-1">
                <img :src="prod.imageUrl?.[0]" />
              </figure>
            </div>
            <div class="content">
              <div class="is-5 has-text-weight-bold">{{ prod.title }}</div>
              <p class="is-marginless">x{{ prod.quantity }}</p>
              <p class="is-marginless">{{ toCash(prod.price) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="column desktop">
        <figure class="image is-128x128">
          <img :src="prod.imageUrl?.[0]" />
        </figure>
      </div>
      <div class="column desktop">{{ prod.title }}</div>
      <div class="column desktop">x{{ prod.quantity }}</div>
      <div class="column desktop">{{ toCash(prod.price) }}</div>
    </div>
  </div>
  <div
    class="columns is-marginless collapse is-centered"
    v-if="showCollapseButton"
  >
    <div class="column is-full text-center">
      <button
        class="collapse__btn"
        :class="collapseIcon"
        @click="toggleCollapse()"
      >
        <i
          class="icon"
          :class="`i-fa-solid-angle-double-${isCollapse ? 'up' : 'down'}`"
        />
      </button>
    </div>
  </div>
</template>
<style lang="scss">
.collapse__btn {
  cursor: pointer;
  padding: 1% 2%;
  border: 0;
  background: transparent;
  outline: none;
  transform: translateY(0);
  &.down {
    animation: collapseAnimation 1s infinite linear forwards;
  }
  &.up {
    animation: collapseAnimation 1s infinite linear reverse forwards;
  }
  &:hover {
    animation-play-state: paused;
  }
}
</style>
