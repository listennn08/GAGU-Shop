<script setup lang="ts"></script>

<template>
  <div class="container flex flex-col items-center justify-center mb-8">
    <div class="noItemAlert">還沒有把喜愛的商品加入購物車唷 趕快去購物吧！</div>
    <button class="button is-primary" @click="(_) => navigateTo('products')">
      &lsaquo;&lsaquo;繼續購物
    </button>
  </div>
</template>
<style lang="scss" scoped>
.noItemAlert {
  margin: 50px 0;
  padding: 50px 0;
  font-size: 24px;
}
</style>
