<script lang="ts" setup>
const props = defineProps<{ images: string[] }>()
const index = ref(0)
const current = (idx: number) => idx === index.value
const changeIndex = (action: string) => {
  switch (action) {
    case 'plus':
      if (index.value < props.images.length - 1) {
        index.value += 1
      }
      break
    case 'minus':
      if (index.value > 0) {
        index.value -= 1
      }
      break
    default:
  }
}
</script>
<template>
  <div class="section">
    <div class="carousel">
      <button class="button is-fixed-left" @click="changeIndex('minus')">
        <i class="icon i-fa-solid-angle-left" />
      </button>
      <button class="button is-fixed-right" @click="changeIndex('plus')">
        <i class="icon i-fa-solid-angle-right" />
      </button>
      <div>
        <nuxt-img alt="" :src="images[index]" />
        <div class="under">
          <div
            v-for="(_, index) in images"
            class="line"
            :class="{ focus: current(index) }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.carousel {
  position: relative;
}
.button {
  position: absolute;
  top: 50%;
  bottom: 50%;
}
.is-fuxed-left {
  left: 0;
}
.is-fixed-right {
  right: 0;
}
.under {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .line {
    margin: 0 2px;
    width: 20px;
    height: 5px;
    border: 1px solid #888;
    border-radius: 5px;
    background: transparent;
    &.focus {
      background: #888;
    }
  }
}
</style>
