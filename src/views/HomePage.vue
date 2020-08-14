<template lang="pug">
  section
    section.section
      .container
        figure.image.is-3by1
          img(:src="require('../assets/banner.jpg')")
          .text 進來坐坐吧，看看不用錢
          router-link.button.is-light.is-small.link(to="products") 商品資訊 &rsaquo;&rsaquo;
    .container.mt-5
      .subtitle.is-4.cus-title.has-text-weight-bold.has-text-centered 本周主打
      .columns.is-multiline.is-gapless
        .column.is-third-four(
          v-for="data in datas"
          :key="data.id"
        )
          figure.image.1by1
            img(:src="data.imageUrl[0]")
            .txt.has-text-left.px-2.py-2
              .has-text-light.mh-70 {{ data.title }}
              .has-text-light.mt-auto {{ data.price | cash }}
              .fullheight.has-centered
                router-link.button.is-outlined.is-warning(:to="`product/${data.id}`") 查看更多
      .subtitle.is-4.cus-title.has-text-weight-bold.has-text-centered 特價商品
      .columns.is-multiline.is-gapless
        .column.is-third-four(
          v-for="data in sales"
        )
          figure.image.1by1
            img(:src="data.imageUrl[0]")
            .txt.has-text-left.px-2.py-2
              .has-text-light.mh-70 {{ data.title }}
              .has-text-light
                span {{ data.price | cash }}
                del.ml-1: small.has-text-lightgray {{ data.origin_price | cash}}
              .fullheight.has-centered
                router-link.button.is-outlined.is-warning(:to="`product/${data.id}`") 查看更多
      .subtitle.is-4.cus-title.has-text-weight-bold.has-text-centered 精選推薦
      .columns.is-multiline.is-gapless
        .column.is-third-four(
          v-for="data in random"
        )
          figure.image.1by1
            img(:src="data.imageUrl[0]")
            .txt.has-text-left.px-2.py-2
              .has-text-light.mh-70 {{ data.title }}
              .has-text-light
                span {{ data.price | cash }}
                del.ml-1: small.has-text-lightgray {{ data.origin_price | cash}}
              .fullheight.has-centered
                router-link.button.is-outlined.is-warning(:to="`product/${data.id}`") 查看更多
</template>
<script>
import { getAllProducts } from '../apis/frontend';

export default {
  data() {
    return {
      datas: [],
      sales: [],
      random: [],
    };
  },
  async created() {
    const loader = this.$loading.show();
    try {
      const resp = await getAllProducts();
      resp.data.data.forEach((item, index) => {
        if (index < 5) {
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
.text
  color: $lightgray
  position: absolute
  font-size: 24px
.text
  bottom: 40%
  left: 2%
.link
  position: absolute
  font-size: 16px
  bottom: 25%
  left: 2%
.cus-title
  color: $navyblue
.image
  position: relative
  &:hover .txt
    background: rgba(#000, .8)
    opacity: 1
.txt
  position: absolute
  height: 100%
  top: 0
  left: 0
  right: 0
  opacity: 0
  transition: .5s
  .fullheight
    display: flex
    align-items: center
    justify-content: center
    position: absolute
    width: 100%
    bottom: 10%
</style>
