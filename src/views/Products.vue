<template lang="pug">
  .tile.is-ancestor
    .tile.is-parent.is-3.category.is-paddingless
      button
        font-awesome-icon(:icon="['fas',  toggleIcon]")
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
  data() {
    return {
      toggle: false,
    };
  },
  computed: {
    ...mapGetters(['sticky']),
    toggleIcon() {
      return this.toggle ? 'faAngleDoubleLeft' : 'faAngleDoubleRight';
    },
  },
};
</script>
<style lang="sass" scoped>
@mixin sm()
  @media screen and (max-width: 564px)
    @content
.category
  +sm
    position: fixed
    left: 0
    top: 10%
    width: 0%
</style>
