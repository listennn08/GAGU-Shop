<template lang="pug">
  .tile.is-ancestor
    .container.is-fluid
      .container
        .banner.banner-1
          .image.is-3by1.is-fixed-left.img-1
            .text-in-img.left
              //- p.has-text-light 進來坐坐吧，看看不用錢
              button.button.is-light.link(@click="goToProduct('bed')") 精選床墊
          .box.is-fixed-right
            .text
              span.logo GAGU
              | 照顧你的睡眠
              p 優質精選高級床墊，讓您睡到連地震都沒感覺
        .banner
          .image.is-3by1.is-fixed-right.img-2
            .text-in-img.right
              //- p.has-text-light 進來坐坐吧，看看不用錢
              button.button.is-light.link(@click="goToProduct('sofa')") 熱銷沙發
          .box.is-fixed-left
            .text
              span.logo GAGU
              | 販售的沙發使用高級檜木打造而成
              p 可承受超過 1000 公斤的重量
        .container.mt-5
          .subtitle.is-4.cus-title.has-text-weight-bold.has-text-centered 精選推薦
          .columns.is-multiline.is-gapless
            .column.is-third-four(
              v-for="data in random"
              @click="$router.push(`product/${data.id}`)"
            )
              .card
                figure.image.1by1
                  img(:src="data.imageUrl[0]")
                .card-info.mx-3
                  h4.subtitle.is-5.is-marginless.mh-70 {{ data.title }}
                  .has-text-primary
                    span.is-font-raleway {{ data.price | cash }}
                    del.ml-1: small.has-text-lightgray.is-font-raleway
                      | {{ data.origin_price | cash }}
                  .fullheight.has-centered
                    button.button.is-primary(@click.stop="$router.push(`product/${data.id}`)") 查看更多
                      //- .txt.has-text-left.px-2.py-2
        //- .subtitle.is-4.cus-title.has-text-weight-bold.has-text-centered 本周主打
        //-   template(v-if="datas[0]")
        //-     ProductCarousel(:datas="datas")
    //-   .subtitle.is-4.has-text-primary.has-text-weight-bold.has-text-centered 特價商品
    //-   .columns.is-multiline.is-gapless
    //-     .column.is-third-four(
    //-       v-for="data in sales"
    //-     )
    //-       figure.zoonin.image.1by1
    //-         img(:src="data.imageUrl[0]")
    //-         .txt.has-text-left.px-1.py-1
    //-           .has-text-light {{ data.title }}
    //-           .has-text-light
    //-             span {{ data.price | cash }}
    //-             del.ml-1: small.has-text-lightgray {{ data.origin_price | cash }}
    //-           .fullheight.has-centered
    //-             router-link.button.is-outlined.is-warning.is-small(:to="`product/${data.id}`")
    //-               | 查看更多
</template>
<script>
import skrollr from 'skrollr';
import { mapActions } from 'vuex';
import ProductCarousel from '@/components/ProductCarousel.vue';
import { getAllProducts } from '@/apis/frontend';

window.skrollr = skrollr.init();

export default {
  name: 'HomePage',
  components: {
    ProductCarousel,
  },
  data() {
    return {
      datas: [],
      sales: [],
      random: [],
      s: null,
    };
  },
  async created() {
    window.addEventListener('scroll', this.handleScroll);
    const loader = this.$loading.show();
    try {
      const resp = await getAllProducts();
      resp.data.data.forEach((item, index) => {
        if (item.category === 'sofa' || item.category === 'chair') {
          this.datas.push(item);
        } else if (index < 10) {
          this.sales.push(item);
        }
      });
      while (this.random.length < 5) {
        const n = Math.floor(Math.random() * (resp.data.data.length + 1) - 1);
        if (this.random.findIndex((el) => el.id === resp.data.data[n].id) === -1) {
          this.random.push(resp.data.data[n]);
        }
      }
      loader.hide();
    } catch {
      loader.hide();
    }
  },
  methods: {
    ...mapActions({
      setCategory: 'product/setCategory',
    }),
    goToProduct(category) {
      this.setCategory(category);
      this.$router.push('products');
    },
    handleScroll() {
      // console.log(window.scrollY);
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

$navyblue: #333D50
$hnavyblue: #242b39
.img-1
  position: relative
  &::after
    content: ''
    background: url('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80') center center / 100%
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
.img-2
  background: url('https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80') center center / 100%

.logo
  font-family: 'Lobster', sans serif
  margin-right: 1%
.container
  display: flex
  flex-direction: column

.banner
  width: 100%
  box-sizing: border-box
  position: relative
  margin: 5% 0
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  // border: 1px solid #dde
  &-1
    transition: .5s
.box
  position: absolute
  background-color: rgba(#F4F3EA, .8)
  padding: 4% 2%
  display: flex
  align-items: center
  color: $hnavyblue
  &.is-fixed-right
    top: 10%
    left: 50%
    right: 0%
    bottom: 70%
    text-align: left
  &.is-fixed-left
    top: 10%
    left: 0%
    right: 50%
    bottom: 70%
    text-align: right
    justify-content: flex-end
.column
  cursor: pointer
.image
  width: 80%
  &.is-fixed-left
    align-self: flex-start
  &.is-fixed-right
    align-self: flex-end
.text
  width: 100%
.text-in-img
  position: absolute
  top: 80%
  z-index: 1
  &.left
    left: 5%
  &.right
    right: 5%
.card
  display: flex
  justify-content: center
  border: 1px solid transparent
  overflow: hidden
  &-image
    transform: perspective(800px)
    transform-style: preserve-3d
  &:hover
    border: 1px solid #ddd
    border-radius: 6px
    .card-info
      top: 10%
      z-index: 2
      .des
        opacity: 1
  &::before
    content: ''
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    background: rgba(#aaa , .8)
    opacity: 0
    transition: .6s
    z-index: 1
  &:hover::before
    opacity: 1
.image
  position: relative
  cursor: pointer
  &::before
    content: ''
    position: absolute
    height: 100%
    left: 0
    right: 100%
    transition: .5s
    // background: rgba(#888, .5)
    border-radius: 6px
    right: 0
  &:hover::before
.card-info
  align-self: flex-start
  position: absolute
  padding: 2%
  top: 70%
  bottom: 0
  transition: top .5s
  h4
    text-shadow: rgba(#ddd, .8) 0.1em 0.1em 1px
  .des
    line-height: 20px
    opacity: 0
    text-shadow: rgba(#ddd, .8) 0.1em 0.1em 1px
    transition: opacity 1s

// .text
//   color:  $navyblue
//   position: absolute
//   font-size: 24px
// .text
//   bottom: 25%
//   left: 20%
// .link
//   position: absolute
//   font-size: 16px
//   bottom: 10%
//   left: 2%
// .cus-title
//   color: $navyblue
// .zoonin
//   transition: transform .5s
//   font-size: 1px
//   &:hover
//     transform: scale(1.8)
//     box-shadow: 5px 5px 10px #888
//     z-index: 999
// .image
//   background-size: 100%
//   background-position: top center
//   position: relative
//   &:hover .txt
//     background: rgba(#000, .8)
//     opacity: 1
//     transform: scale(1)
// .txt
//   // position: absolute
//   height: 100%
//   top: 0
//   left: 0
//   right: 0
//   opacity: 0
//   transition: .5s
//   z-index: 999
//   display: flex
//   flex-direction: column
//   .fullheight
//     display: flex
//     align-items: center
//     justify-content: center
//     align-self: flex-end
//     width: 100%
//     height: 100%
// .is-fixed
//   position: absolute
//   opacity: .8
//   top: 10%
//   left: -5%
//   right: 70%
//   bottom: 10%
</style>
