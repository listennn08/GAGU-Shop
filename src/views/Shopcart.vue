<template lang="pug">
  .container.is-fluid
    Cart
</template>
<script>
import { mapGetters } from 'vuex';
import Cart from '@/components/cart/Cart.vue';

export default {
  name: 'Shopcart',
  components: {
    Cart,
  },
  computed: {
    ...mapGetters({
      shopcartItems: 'shopcart/shopcartItems',
    }),
  },
};
</script>
<style lang="sass" scoped>
$navyblue: #333D51
$hnavyblue: #242b39
$goldyellow: #D3AC2B
$darkgray: #CBD0D8
$lightgray: #F4F3EA

*
  font-family: 'Noto Sans TC', sans serif
.table
  td
    width: 15%
    padding: 1rem
    text-align: center
    vertical-align: middle
.price
  width: 100%
  text-align: left
  font-family: 'Raleway', sans-serif
  font-weight: 500
  span.strike
    margin-left: 1%
    font-size: 12px
    text-decoration: line-through
    color: #888
  &.in-bottom
    margin-top: auto
.item-total
  font-family: 'Raleway', sans-serif
.total
  td
    font-family: 'Raleway', sans-serif
.checkout
  &:hover
    background: $hnavyblue
  &:hover a
    color: $lightgray
.continueshop
  background: $lightgray
  color: $navyblue
  &:hover
    background: $lightgray
    color: $hnavyblue
    &:hover a
      color: $hnavyblue
</style>
