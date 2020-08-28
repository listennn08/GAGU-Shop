<template lang="pug">
  .box.is-shadowless.mt-1
    .subtitle.is-4.is-clearfix.has-text-weight-bold.has-text-centered {{ title }}
    .columns.is-multiline
      .column.is-third-four(
        v-for="data in recommend"
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
</template>
<script>
import { getAllProducts } from '@/apis/frontend';

export default {
  name: 'RandomRecommend',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      recommend: [],
    };
  },
  created() {
    this.getRandomProducts();
  },
  methods: {
    async getRandomProducts() {
      const resp = await getAllProducts();
      const { data } = resp.data;
      const { total } = resp.data.meta.pagination;
      while (this.recommend.length < 5) {
        const random = Math.floor(Math.random() * total);
        if (!this.recommend.find((el) => el.id === data[random].id)) {
          this.recommend.push(data[random]);
        }
      }
    },
  },
};
</script>
<style lang="sass" scoped>
.card
  display: flex
  justify-content: center
  border: 1px solid transparent
  overflow: hidden
  border-radius: 6px
  &-image
    transform: perspective(800px)
    transform-style: preserve-3d
  &:hover
    border: 1px solid #ddd
    border-radius: 6px
    .card-info
      top: 15%
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
    border-radius: 6px
    right: 0
  &:hover::before
.card-info
  align-self: flex-start
  position: absolute
  padding: 2%
  top: 72%
  bottom: 0
  transition: top .5s
  h4
    text-shadow: rgba(#ddd, .8) 0.1em 0.1em 1px
  .des
    line-height: 20px
    opacity: 0
    text-shadow: rgba(#ddd, .8) 0.1em 0.1em 1px
    transition: opacity 1s
</style>
