<script setup lang="ts">
import { useAppStore } from '~~/store/appStore'

const appStore = useAppStore()
</script>
<template>
  <section>
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-two-thirds text-center">
            <steps />
            <order />
            <NuxtLink
              class="my-5 button is-primary"
              v-if="appStore.currentStep === 3"
              to="/products/"
            >
              再去購物
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
