<template lang="pug">
  aside.menu.mt-5.has-cus-background-light(
    :class="sticky"
  )
    ul.menu-list
      li: a(@click="setCategory('')") 全部商品
      li: a(@click="setCategory('bed')") 床架／床墊
      li: a(@click="setCategory('chair')") 椅子／沙發
      li: a(@click="setCategory('case')") 櫃子／桌子
      li: a(@click="setCategory('curtain')") 地毯／窗簾
</template>
<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions({
      setCategory: 'product/setCategory',
      sticky: 'sticky',
    }),
  },
};
</script>
<style lang="sass" scoped>
@mixin mediumScreen()
  @media screen and (max-width: 1440px)
    @content
*
  font-family: 'Noto Sans TC', sans serif
.menu
  top: 0
  transition: .5s
  &.sticky
    width: 22%
    position: fixed
    top: 10%
    left: 3%
</style>
