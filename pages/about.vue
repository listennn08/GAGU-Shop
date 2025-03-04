<script setup lang="ts">
import dayjs from 'dayjs'
import { timeline } from '~/assets/about/timeline'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function formatDate(year: number, month: number) {
  return dayjs(`${year}-${month}-1`).format('YYYY/MM')
}
</script>

<template>
  <section class="static py-4">
    <p-timeline :value="timeline" align="alternate">
      <template #content="{ item }">
        <div v-p-animateonscroll="item.animation" class="animate-duration-1000">
          <p-tag
            :value="formatDate(item.year, item.month)"
            severity="secondary"
            class="mb-2"
          />
          <p-panel :header="item[locale].header">
            <div v-html="item[locale].content.join('<br />')" />
          </p-panel>
        </div>
      </template>
    </p-timeline>

    <div
      class="fixed inset-y-0 right-0 pointer-events-none z-[-1] before:content-[''] before:w-full before:h-full before:right-0 before:bottom-0 before:absolute before:bg-[linear-gradient(90deg,#ffffff,transparent)])"
    >
      <img src="/img/photo-1591822459440-5db10556435a.jpg" alt="" />
    </div>
  </section>
</template>
