<template lang="pug">
  .container
    .noItemAlert
      | 還沒有把喜愛的商品加入購物車唷
      | 趕快去購物吧！
    button.button.is-primary(
      @click="$router.push('products')"
    ) &lsaquo;&lsaquo;繼續購物

</template>
<script>
import RandomRecommend from '@/components/RandomRecommend.vue';

export default {
  name: 'NoCart',
  components: {
    RandomRecommend,
  },
};
</script>
<style lang="sass" scoped>
.noItemAlert
  margin: 50px 0
  padding: 50px 0
  font-size: 24px
</style>
