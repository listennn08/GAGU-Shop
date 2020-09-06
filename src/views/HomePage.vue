<template lang="pug">
  .container.is-fluid
    .container
      .banner.banner-1.desktop
        .image.is-3by1.is-fixed-left.img-1
          .text-in-img.left
            button.button.is-light.link(@click="goToProduct('bed')") 精選床墊
        .box.box-set.is-fixed-right.has-background-light
          .text
            span.logo GAGU
            | 照顧你的睡眠
            p 優質精選高級床墊，讓您睡到連地震都沒感覺
      //- mobile
      .banner.mobile
        .image.is-2by1.img-1
          .text-in-img.left.mobile
            button.button.is-light.link(@click="goToProduct('bed')") 精選床墊
        .box.box-set.has-background-light.mobile
          .text.mobile
            span.logo GAGU
            | 照顧你的睡眠
            p 優質精選高級床墊，讓您睡到連地震都沒感覺
      .banner.desktop
        .image.is-3by1.is-fixed-right.img-2
          .text-in-img.right
            button.button.is-light.link(@click="goToProduct('sofa')") 熱銷沙發
        .box.box-set.is-fixed-left.has-background-light
          .text
            span.logo GAGU
            | 販售的沙發使用高級檜木打造而成
            p 可承受超過 1000 公斤的重量
      //- mobile
      .banner.mobile
        .image.is-2by1.img-2
          .text-in-img.right.mobile
            button.button.is-light.link(@click="goToProduct('sofa')") 熱銷沙發
        .box.box-set.has-background-light.mobile
          .text.mobile
            span.logo GAGU
            | 販售的沙發使用高級檜木打造而成
            p 可承受超過 1000 公斤的重量
      .banner.mt-5
        RandomRecommend(
          title="精選推薦"
          type="all"
          centered=true
        )
      .banner
        .image.is-3by1.img-3
        .box.box-set.is-shadowless.mt-1.has-background-transparent
          .has-text-left
            p 想了解更多 GAGU 的傢俱細節？
            p 想知道更多關於 GAGU 的故事？
            p 不想老是錯過 GAGU 的最新消息？
            p 那就訂閱電子報吧！GAGU 的所有最新資訊都在這！
          .field.has-addons.has-addons-centered.mt-1.is-fullwidth
            .control.is-expanded
              input.input(
                placeholder="輸入電子郵件"
                type="mail"
                v-model="email"
              )
            .control
              button.button.is-primary(
                type="button"
                @click="subcribe()"
              ) 訂閱電子報
        .in_right.desktop
          button.is-outlinedless.is-rounded(
            data-tooltip="鬼月不怕買傢俱！GAGU 全館五折起！\n折扣碼：7buymore"
            :class="{'has-tooltip-active': showTooltip}"
            @click="showTooltip = !showTooltip"
          )
            font-awesome-icon(:icon="['fas', 'exclamation-circle']")
        .in_right.mobile
          button.is-outlinedless.is-rounded.has-tooltip-left(
            data-tooltip="鬼月不怕買傢俱！GAGU 全館五折起！\n折扣碼：7buymore"
            :class="{'has-tooltip-active': showTooltip}"
            @click="showTooltip = !showTooltip"
          )
            font-awesome-icon(:icon="['fas', 'exclamation-circle']")
</template>
<script>
import { mapActions } from 'vuex';
import RandomRecommend from '@/components/RandomRecommend.vue';

export default {
  name: 'HomePage',
  components: {
    RandomRecommend,
  },
  data() {
    return {
      email: '',
      showTooltip: true,
    };
  },
  methods: {
    ...mapActions({
      setCategory: 'product/setCategory',
      setMsg: 'setMsg',
    }),
    goToProduct(category) {
      this.setCategory(category);
      this.$router.push('products');
    },
    subcribe() {
      if (this.email) {
        this.setMsg({
          msg: `使用 ${this.email} 訂閱電子報完成`,
          type: true,
        });
      }
      this.email = '';
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
*
  font-family: 'Noto Sans TC', sans serif
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;900&family=Raleway:wght@700;900&family=Lobster&display=swap')
@mixin tablet
  @media screen and (min-width: 576px) and (max-width: 767px)
    @content
@mixin desktop
  @media screen and (min-width: 768px)
    @content
@mixin widescreen
  @media screen and (min-width: 993px)
    @content

$navyblue: #333D50
$hnavyblue: #242b39
.img-1
  background: url('../static/banner-1.jpeg') center center / 100%
  position: relative
.img-2
  background: url('../static/photo-1493663284031-b7e3aefcae8e.jpg') center center / 100%
.img-3
  background: url('../static/photo-1505620391902-46b120671eb6.jpg') center center / 100%
.logo
  font-family: 'Lobster', sans serif
  margin-right: 1%

.banner
  width: 100%
  box-sizing: border-box
  position: relative
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  @media screen and ( max-width: 767px )
    &.desktop
      display: none
  @media screen and ( min-width: 767px )
    &.mobile
      display: none
  &:not(:last-of-type)
    margin: 5% 0
  &-1
    transition: .5s
.box
  &.box-set
    position: absolute
    padding: 4% 2%
    display: flex
    justify-content: center
    flex-direction: column
    color: $hnavyblue
  &.is-fixed-right
    top: 10%
    left: 50%
    right: 0%
    bottom: 70%
    text-align: left
    +tablet
      left: 40%
  &.is-fixed-left
    top: 10%
    left: 0%
    right: 50%
    bottom: 70%
    text-align: right
    +tablet
      right: 40%
  &.mobile
    top: 5%
    opacity: .8
    width: 100%
.column
  cursor: pointer
.image
  width: 100%
  &.is-fixed-left
    width: 80%
    align-self: flex-start
  &.is-fixed-right
    width: 80%
    align-self: flex-end
.text
  width: 100%
  font-size: 16px
  +tablet
    font-size: 14px
.text-in-img
  position: absolute
  top: 80%
  &.mobile
    top: 70%
  +tablet
    top: 70%
  z-index: 1
  &.left
    left: 5%
  &.left.mobile
    left: 50%
    transform: translateX(-50%)
  &.right
    right: 5%
  &.right.mobile
    right: 50%
    transform: translateX(50%)
.in_right
  position: fixed
  top: 90%
  z-index: 888
  &.desktop
    right: 120px
  &.mobile
    right: 10px
.is-outlinedless
  background: transparent
  border: 0
  outline: 0
  font-size: 28px
  color: #333d51
  &::before
    margin-top: -5%
  &.has-tooltip-active &::after
    opacity: 1
  &:hover::after
    opacity: 1
  &:focus
    outline: none
</style>
