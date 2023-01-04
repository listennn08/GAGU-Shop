<script lang="ts" setup>
import { useAppStore } from '~~/store/appStore'

const appStore = useAppStore()
const steps = [
  {
    no: 1,
    text: '填寫訂單',
  },
  {
    no: 2,
    text: '訂單確認',
  },
  {
    no: 3,
    text: '確認付款',
  },
]
const inStep = (index: number) =>
  appStore.currentStep >= index ? 'is-active is-success' : ''
</script>

<template>
  <div class="steps">
    <div
      v-for="step in steps"
      :key="step.no"
      :class="inStep(step.no)"
      class="step-item"
    >
      <div class="step-marker">{{ step.no }}</div>
      <div class="step-details">
        <p class="step-title">{{ step.text }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
