<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const steps = [
  {
    no: 1,
    text: t('checkout.fill-order'),
  },
  {
    no: 2,
    text: t('checkout.order-confirm'),
  },
  {
    no: 3,
    text: t('checkout.confirm-payment'),
  },
]
</script>

<template>
  <p-stepper class="mb-4">
    <p-step-list>
      <p-step v-for="step in steps" :key="step.no" :value="step.no">
        {{ step.text }}
      </p-step>
    </p-step-list>
  </p-stepper>
</template>

<style scoped></style>
