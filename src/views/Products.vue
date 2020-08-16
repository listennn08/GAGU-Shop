<template lang="pug">
  .tile.is-ancestor
    .tile.is-parent.is-3
      categoryList.is-child(:class="{sticky}")
    .tile.is-parent.is-7
      productList.is-child
</template>
<script>
import { mapGetters } from 'vuex';
import categoryList from '@/components/ProductCategories.vue';
import productList from './ProductList.vue';

export default {
  components: {
    categoryList,
    productList,
  },
  computed: {
    ...mapGetters(['sticky']),
  },
};
</script>
<style lang="sass" scoped>
</style>
