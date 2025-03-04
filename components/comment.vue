<script setup lang="ts">
import { type IFeedback } from '~~/store/productStore'

defineProps<{
  feedback: IFeedback
}>()

const fill = (index: number, rate: number) => index <= rate
</script>

<template>
  <p-panel class="w-[calc(95%-1rem)] mx-auto md:w-[calc(50%-1rem)] md:m-4">
    <template #header>
      <div class="flex items-center gap-x-4">
        <p-avatar :image="feedback.pic" shape="circle" size="large" />
        <span class="font-bold">{{ feedback.id }}</span>
        <div class="flex gap-x-1">
          <span
            class="text-gray-500 text-shadow"
            v-for="x in 5"
            :key="x"
            :class="{
              'text-yellow': fill(x, feedback.star),
            }"
          >
            &#9733;
          </span>
        </div>
      </div>
    </template>

    <p class="m-0">{{ feedback.comment }}</p>
  </p-panel>
</template>
