<script setup lang="ts">
import { IFeedback } from '~~/store/productStore'

defineProps<{
  feedback: IFeedback
}>()

const fill = (index: number, rate: number) => index <= rate
</script>

<template>
  <div
    class="shadow-md p-4 rounded w-[calc(95%-1rem)] mx-auto md:w-[calc(50%-1rem)] md:mx-4"
  >
    <article class="flex items-start">
      <div class="mr-4 flex-grow-0 flex-shrink-0">
        <figure class="block relative w-16 h-16">
          <nuxt-img :src="feedback.pic" />
        </figure>
      </div>
      <div class="media-content">
        <div>
          <p>
            <strong class="text-xl text-gray-500 lh-10 mr-2">
              {{ feedback.id }}
            </strong>
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
            <br />
            <span>
              {{ feedback.comment }}
            </span>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>
