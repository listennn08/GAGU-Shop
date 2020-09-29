<template lang="pug">
  .container.is-fluid.is-paddingless
    //- mobile
    .banner.mobile.first
      .image.is-2by1.img-1(data-aos="fade-in")
        .text-in-img.center.mobile(data-aos="fade-right")
          button.button.is-light.link(
            class="wow bounceIn"
            @click="goToProduct('')"
          ) 購物去
        .box.box-set.is-fixed-top.has-background-light.o-8.wow.fadeInOut
          .text
            p
              span.logo GAGU
              | 有豐富的傢俱
            p 多種多樣的傢俱任君挑選
            p 還等什麼，馬上就去購物吧～
    .container
      .banner.banner-1.desktop
        .image.is-3by1.img-1(data-aos="fade-in")
          .text-in-img.center(data-aos="fade-right")
            button.button.is-light.link(
              class="wow bounceIn"
              @click="goToProduct('')"
            ) 購物去 &raquo;
        .box.box-set.is-fixed-top.has-background-light.o-8.wow.fadeInOut
          .text
            p
              span.logo GAGU
              | 有豐富的傢俱
            p 多種多樣的傢俱任君挑選
            p 還會不定期有優惠活動，照顧支持 GAGU 的你們
            p 還等什麼，馬上就去購物吧～
      .banner.banner-1.desktop
        .image.is-3by1.is-fixed-right.img-2(data-aos="fade-in")
          .text-in-img.right
            button.button.is-light.link(
              class="wow tada"
              @click="goToProduct('bed')"
            ) 辦公室傢俱首選
        .box.box-set.is-fixed-left.has-background-light
          .text
            h4.subtitle.is-5.has-text-weight-bold.is-marginless
              span.logo GAGU
              | 經濟實惠的辦公室傢俱
            p GAGU 有非常多經濟實惠又好用的辦公室傢俱工各大企業做選擇
            p 購買一定數涼擁有更多折扣，買傢俱？找 GAGU
      //- mobile
      .banner.mobile
        .image.is-2by1.img-2(data-aos="fade-in")
          .text-in-img.left.mobile
            button.button.is-light.link(
              class="wow tada"
              @click="goToProduct('bed')"
            ) 辦公室傢俱首選
      .banner.banner-1.desktop
        .image.is-3by1.is-fixed-left.img-3(data-aos="fade-in")
          .text-in-img.left
            button.button.is-light.link(
              class="wow tada"
              @click="goToProduct('bed')"
            ) 精選床墊
        .box.box-set.is-fixed-right.has-background-light(data-aos="fade-left")
          .text
            h4.subtitle.is-5.has-text-weight-bold.is-marginless
              span.logo GAGU
              | 照顧你的睡眠
            p 優質精選高級床墊，讓您睡到連地震都沒感覺
            p 想一夜好眠？還不趕快馬上來 GAGU 挑床墊～
      //- mobile
      .banner.mobile
        .image.is-2by1.img-3(data-aos="fade-in")
          .text-in-img.left.mobile
            button.button.is-light.link(
              class="wow tada"
              @click="goToProduct('bed')"
            ) 精選床墊
      .banner.desktop
        .image.is-3by1.is-fixed-right.img-4(data-aos="fade-in")
          .text-in-img.right
            button.button.is-light.link(
              class="wow tada"
              @click="goToProduct('sofa')"
            ) 熱銷沙發
        .box.box-set.is-fixed-left.has-background-light(data-aos="fade-right")
          .text
            h4.subtitle.is-5.has-text-weight-bold.is-marginless
              span.logo GAGU
              | &nbsp;沙發
            p 使用高級檜木打造而成，可承受超過 1000 公斤的重量
            p 適合全家大小一起坐在沙發上看電視
      //- mobile
      .banner.mobile
        .image.is-2by1.img-4(data-aos="fade-in")
          .text-in-img.right.mobile
            button.button.is-light.link(
              class="wow tada"
              @click="goToProduct('sofa')"
            ) 熱銷沙發
      .banner.mt-5
        RandomRecommend(
          data-aos="zoom-left"
          title="精選推薦"
          type="all"
          centered=true
        )
      .banner
        .image.is-3by1.img-5.desktop
        .image.is-2by1.img-5.mobile
        .box.box-set.is-shadowless.mt-1.has-background-transparent
          .has-text-left(data-aos="fade-down")
            p.is-size-6-mobile.has-text-centered 不想老是錯過 GAGU 的最新消息？
            p.is-size-6-mobile.has-text-centered 那就訂閱電子報吧！
            p.is-size-6-mobile.has-text-centered GAGU 的所有最新資訊都在這！
          .field.has-addons.has-addons-centered.mt-1.is-fullwidth(data-aos="fade-down")
            .control.is-expanded
              input.input.is-small(
                placeholder="輸入電子郵件"
                type="mail"
                v-model="email"
              )
            .control
              button.button.is-primary.is-small(
                type="button"
                @click="subcribe()"
              ) 訂閱電子報
        .in_right.desktop
          .relative
            .tooltip.has-background-primary.has-text-light.py-2(
              :class="{'showTooltip': (showTooltip || mouseoverShow)}"
            )
              | 鬼月不怕買傢俱！
              br
              | GAGU 全館五折起！
              br
              | 折扣碼：
              span {{ discountCode }}
              input#copy(type="hidden" :value="discountCode")
              br
              a.button.is-small.mt-2(
                href="#"
                @click.prevent="copyCode()"
              ) 複製折扣碼
          button#discount__btn.is-outlinedless.is-rounded(
            title="折扣碼"
            @click="showTooltip = !showTooltip"
          )
            font-awesome-icon(:icon="['fas', 'tags']")
        .in_right.mobile
          .relative
            .tooltip.has-background-primary.has-text-light.py-2(
              :class="{'showTooltip': (showTooltip || mouseoverShow)}"
            )
              | 鬼月不怕買傢俱！
              br
              | GAGU 全館五折起！
              br
              | 折扣碼：
              span {{ discountCode }}
              input#copy(type="hidden" :value="discountCode")
              br
              a.button.is-small.mt-2(
                href="#"
                @click.prevent="copyCode()"
              ) 複製折扣碼
          button.is-outlinedless.is-rounded(
            title="折扣碼"
            @click="showTooltip = !showTooltip"
          )
            font-awesome-icon(:icon="['fas', 'tags']")
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
      mouseoverShow: false,
      discountCode: '7buymore',
    };
  },
  mounted() {
    document.querySelector('.in_right').addEventListener('mouseover', () => {
      this.mouseoverShow = true;
      document.querySelector('.in_right').addEventListener('mouseout', () => {
        this.mouseoverShow = false;
      });
    });
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
    copyCode() {
      const copyObj = document.querySelector('#copy');
      copyObj.setAttribute('type', 'text');
      copyObj.select();
      try {
        const success = document.execCommand('copy');
        const msg = success ? '已複製折扣碼' : '複製失敗，請再試一次';
        this.setMsg({
          msg,
          type: success,
        });
      } catch (e) {
        this.setMsg({
          msg: 'error',
          type: false,
        });
      }

      copyObj.setAttribute('type', 'hidden');
      window.getSelection().removeAllRanges();
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
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;900&family=Lobster&display=swap')
@mixin tablet
  @media screen and (min-width: 576px) and (max-width: 767px)
    @content
@mixin desktop
  @media screen and (min-width: 768px)
    @content
@mixin widescreen
  @media screen and (min-width: 993px)
    @content
@mixin xxs
  @media screen and (max-width: 375px)
    @content
$navyblue: #333D50
$hnavyblue: #242b39
.img-1
  background: url('../static/alexandra-gorn-JIUjvqe2ZHg-unsplash.jpg') bottom center / 100%
.img-2
  background: url('../static/drew-beamer-Se7vVKzYxTI-unsplash.jpg') center center / 100%
.img-3
  background: url('../static/banner-1.jpeg') center center / 100%
  position: relative
.img-4
  background: url('../static/photo-1493663284031-b7e3aefcae8e.jpg') center center / 100%
.img-5
  background: url('../static/sincerely-media-OOHsoUNRxt8-unsplash.jpg') center 60% / 100%
  &.mobile
    background: url('../static/sincerely-media-OOHsoUNRxt8-unsplash.jpg') center 60% / 200%
.logo
  font-family: 'Lobster', sans serif
  margin-right: 1%
.container
  padding-left: 20px
  padding-right: 20px
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
  &.mobile.first
    margin: 0
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
  &.is-fixed-top
    top: 10%
    left: 20%
    right: 20%
    +xxs
      top: 5%
      left: 10%
      right: 10%
  &.is-fixed-right
    top: 10%
    left: 50%
    right: 0%
    bottom: 60%
    text-align: center
    +tablet
      left: 40%
  &.is-fixed-left
    top: 10%
    left: 0%
    right: 50%
    bottom: 60%
    text-align: center
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
.o-8
  opacity: .8
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
  &.center
    left: 50%
    right: 50%
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
  button
    cursor: pointer
    font-size: 36px
  &.desktop
    right: 70px
    .relative
      position: relative
      .tooltip
        opacity: 0
        z-index: -999
        position: absolute
        left: -110px
        right: -60px
        top: -120px
        transition: .2s
        border-radius: 15px
        &.showTooltip
          opacity: 1
          z-index: 80
          top: -130px
  &.mobile
    right: 10px
    .relative
      position: relative
      .tooltip
        opacity: 0
        z-index: -999
        position: absolute
        left: -300px
        right: 50px
        top: -50px
        transition: .2s
        border-radius: 15px
        &.showTooltip
          opacity: 1
          z-index: 80
          right: 60px
          +xxs
            left: -250px
            top: -80px
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
