<template lang="pug">
  .tile.is-ancestor
    .tile.is-parent.is-3.category.is-paddingless(:class="{close: toggle}")
      .collapse
        button(@click="toggleCollapse")
          font-awesome-icon(:icon="['fas',  'angle-double-left']")
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
<style lang="sass" scoped>
$navyblue: #333D51
$hnavyblue: #242b39
$goldyellow: #D3AC2B
$darkgray: #CBD0D8
$darkgrayn: #46505e
$lightgray: #F4F3EA

@mixin sm()
  @media screen and (max-width: 564px)
    @content
.category
    +sm
      position: fixed
      z-index: 999
      width: 140px
      height: 100vh
      display: flex
      flex-direction: column
      justify-content: center
      transform: translateX(0)
      transition: .5s
      &.close
        transform: translateX(-100%)
        .collapse
          transform: translateX(70%)
        button
          transform:  rotate(-180deg)
        .container
          box-shadow: 0 0 0
      .collapse
        display: block
        position: absolute
        align-self: flex-end
        transition: .5s
        left: 100px
        right: -20px
        button
          text-align: center
          width: 36px
          height: 36px
          border: 1px solid $navyblue
          color: $navyblue
          border-radius: 200px
          font-size: 20px
          background: $lightgray
          transition: .5s
          // padding-right: 20%
          &:focus
            outline: none
.collapse
  display: none
</style>
