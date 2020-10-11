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
            :class="active('curtain')"
            @click.prevent="setCategory('curtain')"
          ) 窗簾
        li
          a(
            href="#"
            :class="active('bed')"
            @click.prevent="setCategory('bed')"
          ) 床架
        li
          a(
            href="#"
            :class="active('chair')"
            @click.prevent="setCategory('chair')"
          ) 椅子
        li
          a(
            href="#"
            :class="active('sofa')"
            @click.prevent="setCategory('sofa')"
          ) 沙發
        li
          a(
            href="#"
            :class="active('lamp')"
            @click.prevent="setCategory('lamp')"
          ) 檯燈
        li
          a(
            href="#"
            :class="active('bookcase')"
            @click.prevent="setCategory('bookcase')"
          ) 書櫃
        li
          a(
            href="#"
            :class="active('wardrobe')"
            @click.prevent="setCategory('wardrobe')"
          ) 衣櫃
        li
          a(
            href="#"
            :class="active('cabinet')"
            @click.prevent="setCategory('cabinet')"
          ) 電視櫃
        li
          a(
            href="#"
            :class="active('table')"
            @click.prevent="setCategory('table')"
          ) 吧台桌
    .menu.has-background-light.mobile
      .collapse
        button.button.is-small.is-text(@click="toggleCollapse")
          font-awesome-icon(:icon="['fas',  expand ? 'angle-double-up' : 'angle-double-down']")
      ul.menu-list.mx-1(:class="{expand}")
          li
            a(href="#" disabled) {{ currentCategory }}
          li
            a(
              href="#"
              :class="active('')"
              @click.prevent="setCategory('');toggleCollapse();"
            ) 全部商品
          li
            a(
              href="#"
              :class="active('curtain')"
              @click.prevent="setCategory('curtain');toggleCollapse();"
            )
              .item
                span 窗簾
                span.ml-1
                    img(:src="require('@/assets/window.svg')")
          li
            a(
              href="#"
              :class="active('bed')"
              @click.prevent="setCategory('bed');toggleCollapse();"
            )
              span 床架
              span.ml-1
                font-awesome-icon(:icon="['fas', 'bed']")
          li
            a(
              href="#"
              :class="active('chair')"
              @click.prevent="setCategory('chair');toggleCollapse();"
            )
              span 椅子
              span.ml-1
                font-awesome-icon(:icon="['fas', 'chair']")
          li
            a(
              href="#"
              :class="active('sofa')"
              @click.prevent="setCategory('sofa');toggleCollapse();"
            )
              span 沙發
              span.ml-1
                font-awesome-icon(:icon="['fas', 'couch']")
          li
            a(
              href="#"
              :class="active('lamp')"
              @click.prevent="setCategory('lamp');toggleCollapse();"
            )
              .item
                span 檯燈
                span.ml-1
                  img(:src="require('@/assets/lamp.svg')")
          li
            a(
              href="#"
              :class="active('bookcase')"
              @click.prevent="setCategory('bookcase');toggleCollapse();"
            )
              .item
                span 書櫃
                span.ml-1
                  img(:src="require('@/assets/shelving.svg')")
          li
            a(
              href="#"
              :class="active('wardrobe')"
              @click.prevent="setCategory('wardrobe');toggleCollapse();"
            )
              .item
                span 衣櫃
                span.ml-1
                  img(:src="require('@/assets/wardrobe.svg')")
          li
            a(
              href="#"
              :class="active('cabinet')"
              @click.prevent="setCategory('cabinet');toggleCollapse();"
            )
              .item
                span 電視櫃
                span.ml-1
                  img(:src="require('@/assets/cupboard.svg')")
          li
            a(
              href="#"
              :class="active('table')"
              @click.prevent="setCategory('table');toggleCollapse();"
            )
              .item
                span 吧台桌
                span.ml-1
                  img(:src="require('@/assets/bar.svg')")
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
      return (cat) => (this.category === cat ? 'active' : '');
    },
    currentCategory() {
      return (this.category === '' ? this.categoryList.all : this.categoryList[this.category]);
    },
  },
  data() {
    return {
      expand: false,
      categoryList: {
        all: '全部商品',
        bed: '床架',
        chair: '椅子',
        lamp: '檯燈',
        sofa: '沙發',
        bookcase: '書櫃',
        cabinet: '電視櫃',
        wardrobe: '衣櫃',
        table: '桌子',
        curtain: '窗簾',
      },
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
  @media screen and (min-width: 375px)
    @content
@mixin mobile-xs
  @media screen and (max-width: 374px)
    @content
*
  font-family: 'Noto Sans TC', sans serif
.menu
  box-sizing: border-box
  box-shadow: rgba($navyblue, .8) 1px 1px 4px
  top: 8%
  left: 5%
  width: 85%
  margin: 1%
  border-radius: 6px
  position: fixed
  z-index: 3
  transition: .2s
  opacity: .8
  +mobile-xs
    top: 10%
  &:hover
    opacity: 1
.collapse
  position: absolute
  right: 1%
  padding: 1% 0
  button
    outline: none
.menu-list
  height: 36px
  overflow: hidden
  transition: height .2s
  &.expand
    height: 400px
.active
  color: $hnavyblue
  background-color: whitesmoke
  border-color: #D0D1CD
.item
  display: flex
  justify-content: center
  align-items: center
  span
    img
      width: 16px
      display: block
</style>
