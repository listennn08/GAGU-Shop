<template lang="pug">
  section
    .container.mt-5
      .subtitle.is-4.cus-title.has-text-left 本周主打
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
      .subtitle.is-4.cus-title.has-text-left 特價商品
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
</template>
<script>
import { getAllProducts } from '../apis/frontend';

export default {
  data() {
    return {
      datas: [],
      sales: [],
    };
  },
  async created() {
    const loader = this.$loading.show();
    const resp = await getAllProducts();
    resp.data.data.forEach((item, index) => {
      if (index < 5) {
        this.datas.push(item);
      } else if (index < 10) {
        this.sales.push(item);
      }
    });
    loader.hide();
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
.cus-title
  color: $navyblue
  position: relative
  &::before
    content: ''
    position: absolute
    background: $navyblue
    height: 2px
    left: 0
    right: 0
    bottom: -1px
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
