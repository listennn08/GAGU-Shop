<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  id: string
  imageUrl: string[]
  title: string
  category: string
  content: string
  store: number
  quantity: number
  row?: boolean
  loading?: boolean
}>()
const isMobile = useBreakpoints({
  mobile: 768,
}).smaller('mobile')
const emit = defineEmits<{
  'add-to-cart': [id: string, quantity: number]
}>()
const { t } = useI18n()
const quantity = ref(1)
const content = computed(() =>
  props.row && !isMobile.value ? props.content : hideContent(props.content),
)

const shouldShowTag = computed(() => props.store === 1)

const getTagText = computed(() => {
  if (props.store === 1) {
    return t('hot-sale')
  }
  if (props.store < 1) {
    return t('sold-out')
  }
  return ''
})

const getSeverity = computed(() => {
  if (props.store === 1) return 'warn'
  if (props.store < 1) return 'danger'
  return 'success'
})

defineOptions({
  name: 'ItemCard',
  inheritAttrs: false,
})
</script>

<template>
  <p-card
    :key="id"
    class="relative h-full"
    :pt="{
      root: {
        class: {
          '!md:flex-row': row,
        },
      },
      body: {
        class: 'flex-1',
      },
      footer: {
        class: 'mt-auto',
      },
    }"
  >
    <template #header>
      <div class="flex">
        <nuxt-img
          format="webp"
          :src="imageUrl[0]"
          :alt="title"
          class="mx-auto"
          loading="lazy"
          width="256"
          height="256"
          preload
          custom
          v-slot="{ src, isLoaded, imgAttrs }"
        >
          <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />
          <p-skeleton
            v-else
            height="256px"
            width="100%"
            class="min-w-[256px]"
          />
        </nuxt-img>
      </div>
    </template>
    <template #title>
      <div class="flex gap-x-2 mb-4">
        <p-tag
          v-if="shouldShowTag"
          :value="getTagText"
          :severity="getSeverity"
        />
        <p-tag :value="kebabToUpper(category)" severity="secondary" />
      </div>
      {{ title }}
    </template>
    <template #content>
      <p class="mb-4">
        {{ content }}
      </p>
      <div class="flex justify-end font-bold mb-4">
        <nuxt-link :to="`/product/${id}`" :disabled="!store">
          {{ $t('view-more') }} &raquo;
        </nuxt-link>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-between gap-x-2 max-w-[400px]">
        <p-input-number
          v-if="store"
          v-model="quantity"
          showButtons
          buttonLayout="horizontal"
          :min="1"
          :max="store"
          input-class="text-center"
          :input-style="{ width: '3.5rem' }"
          :disabled="loading || !store"
        >
          <template #incrementicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementicon>
            <span class="pi pi-minus" />
          </template>
        </p-input-number>
        <p-button
          :label="store ? $t('add-to-cart') : $t('sold-out')"
          :loading="loading"
          :disabled="loading || !store"
          @click="emit('add-to-cart', id, quantity)"
        />
      </div>
    </template>
  </p-card>
</template>
