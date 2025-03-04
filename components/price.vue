<script lang="ts" setup>
defineProps<{
  price: number
  originPrice: number
}>()
</script>
<template>
  <span>
    <span class="text-lg font-bold">{{ toCash(price) }}</span>
    <del class="ml-1">
      <small class="text-sm text-gray-500 line-through">{{
        toCash(originPrice)
      }}</small>
    </del>
  </span>
</template>
