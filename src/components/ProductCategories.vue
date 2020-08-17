<template lang="pug">
  aside.menu
    ul.menu-list.has-cus-background-light
      li
        a(
          :class="active('')"
          @click="setCategory('')"
        ) 全部商品
      li
        a(
          :class="active('bed')"
          @click="setCategory('bed')"
        ) 床架／床墊
      li
        a(
          :class="active('chair')"
          @click="setCategory('chair')"
        ) 椅子／沙發
      li
        a(
          :class="active('case')"
          @click="setCategory('case')"
        ) 櫃子／桌子
      li
        a(
          :class="active('curtain')"
          @click="setCategory('curtain')"
        ) 地毯／窗簾
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      category: 'product/category',
    }),
    active() {
      return (cat) => (this.category[0] === cat ? 'active' : '');
    },
  },
  methods: {
    ...mapActions({
      setCategory: 'product/setCategory',
      sticky: 'sticky',
    }),
  },
  beforeDestroy() {
    this.setCategory('');
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
*
  font-family: 'Noto Sans TC', sans serif
.menu
  box-sizing: border-box
  top: 0
  width: 80%
  margin: 5% 10% 0
  transition: top .5s
  &.sticky
    width: 19%
    position: fixed
    top: 10%
    margin: 2%
.active
  color: $goldyellow

// .menu
//   +sm
//     position: fixed
//     left: 0
//     z-index: 999
//   &.sticky
//     +sm
//       z-index: 999
</style>
