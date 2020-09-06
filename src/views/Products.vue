<template lang="pug">
  article.container.is-fullheight
    CategoryList
    ProductList
</template>
<script>
import { mapGetters } from 'vuex';
import CategoryList from '@/components/ProductCategories.vue';
import ProductList from './ProductList.vue';

export default {
  name: 'Products',
  components: {
    CategoryList,
    ProductList,
  },
  data() {
    return {
      toggle: true,
    };
  },
  computed: {
    ...mapGetters(['sticky']),
    toggleIcon() {
      return this.toggle ? 'angle-double-left' : 'angle-double-right';
    },
  },
  methods: {
    toggleCollapse() {
      this.toggle = !this.toggle;
    },
  },
};
</script>
