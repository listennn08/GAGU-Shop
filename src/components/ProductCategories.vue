<template lang="pug">
  section
    .tabs.is-info.is-toggle.is-fullwidth.my-3.mx-3.desktop
      ul.is-info
        li.main-menu
          a(
            href="#"
            :class="active('')"
            @click.prevent="setCategory('')"
          ) 全部商品
        li
          a(
            href="#"
            :class="active('bed')"
            @click.prevent="setCategory('bed')"
          ) 床架｜床墊
        li
          a(
            href="#"
            :class="active('chair')"
            @click.prevent="setCategory('chair')"
          ) 椅子｜沙發
        li
          a(
            href="#"
            :class="active('case')"
            @click.prevent="setCategory('case')"
          ) 櫃子｜桌子
        li
          a(
            href="#"
            :class="active('curtain')"
            @click.prevent="setCategory('curtain')"
          ) 地毯｜窗簾
    aside.menu.has-background-light.mobile(:class="{expand}")
      ul.menu-list.mx-1
          li
            a(
              href="#"
              :class="active('')"
              @click.prevent="setCategory('')"
            ) 全部商品
          li
            a(
              href="#"
              :class="active('bed')"
              @click.prevent="setCategory('bed')"
            )
              span
                font-awesome-icon.mr-1(:icon="['fas', 'bed']")
              span 床架 | 床墊
              span
                font-awesome-icon.ml-1(:icon="['fas', 'bed']")
          li
            a(
              href="#"
              :class="active('chair')"
              @click.prevent="setCategory('chair')"
            )
              span
                font-awesome-icon.mr-1(:icon="['fas', 'chair']")
              span 椅子｜沙發
              span
                font-awesome-icon.ml-1(:icon="['fas', 'couch']")
          li
            a(
              href="#"
              :class="active('case')"
              @click.prevent="setCategory('case')"
            )
              .item
                span.mr-1
                  img(:src="require('@/assets/wardrobe.svg')")
                span 櫃子｜桌子
                span.ml-1
                  img(:src="require('@/assets/table.svg')")
          li
            a(
              href="#"
              :class="active('curtain')"
              @click.prevent="setCategory('curtain')"
            )
              .item
                span.mr-1
                  img(:src="require('@/assets/carpet.svg')")
                span 地毯｜窗簾
                span.ml-1
                    img(:src="require('@/assets/window.svg')")
      .collapse(:class="{expand}")
        button(@click="toggleCollapse")
          font-awesome-icon(:icon="['fas',  'angle-double-right']")
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProductCategories',
  computed: {
    ...mapGetters({
      category: 'product/category',
    }),
    active() {
      return (cat) => (this.category[0] === cat ? 'active' : '');
    },
  },
  data() {
    return {
      expand: false,
    };
  },
  methods: {
    ...mapActions({
      setCategory: 'product/setCategory',
      sticky: 'sticky',
    }),
    toggleCollapse() {
      this.expand = !this.expand;
    },
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
@mixin mobile-lg
  @media screen and (max-width: 440px)
    @content
@mixin mobile
  @media screen and (max-width: 375px)
    @content
*
  font-family: 'Noto Sans TC', sans serif
.menu
  box-sizing: border-box
  box-shadow: rgba($navyblue, .8) 1px 1px 4px
  top: 9%
  margin: 2%
  border-radius: 6px
  position: fixed
  z-index: 997
  left: -175px
  transition: left .5s
  &.expand
    left: 0
  .collapse
    position: absolute
    left: 105%
    top: 0%
    transform: translateY(-50%)
    transition: left .5s
    +mobile-lg
      left: 145%
    +mobile
      left: 120%
    &.expand
      left: 95%
      button
        transform: rotate(180deg)
        box-shadow: rgba($navyblue, .8) -1px -1px 4px
    button
      color: $navyblue
      border: 0px
      border-radius: 100%
      outline: 0
      transition: transform opacity .5s
      box-shadow: rgba($navyblue, .8) 1px 1px 4px
      opacity: .8
      &:hover, &:focus
        opacity: 1
  +mobile-lg
    left: -55%
  +mobile
    left: -50%
.active
  color: $hnavyblue

.item
  display: flex
  justify-content: center
  align-items: center
  span
    img
      width: 16px
      display: block
</style>
