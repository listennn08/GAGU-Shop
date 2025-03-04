<script setup lang="ts"></script>
<template>
  <div class="min-h-screen">
    <div class="pt-16 min-h-screen overflow-hidden">
      <slot />
      <p-toast />
    </div>
    <Navbar />
    <Footer />
  </div>
</template>
