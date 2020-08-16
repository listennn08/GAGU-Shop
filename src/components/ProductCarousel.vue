<template lang="pug">
  .carousel
    carousel-3d(:autoplay="true" :autoplay-timeout='2400')
      slide(
        v-for="(data, index) in datas"
        :key="index"
        :index="index"
        :style="{backgroundImage: `url(${data.imageUrl[0]}`}"
      )
        figure.image
          //- img(:src="data.imageUrl[0]")
          .txt.has-text-left.px-2.py-2
            .has-text-light.mh-70 {{ data.title }}
            .has-text-light
              span {{ data.price | cash }}
              del.ml-1: small.has-text-lightgray {{ data.origin_price | cash}}
            .fullheight.has-centered
              router-link.button.is-outlined.is-warning(:to="`product/${data.id}`") 查看更多
</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';

export default {
  data() {
    return {
      slides: 7,
    };
  },
  props: {
    datas: {
      type: Array,
      required: true,
    },
  },
  components: {
    Carousel3d,
    Slide,
  },
};
</script>

<style lang="sass" scoped>
.carousel-3d-slide
  width: 362px !important
  height: 272px !important
  background-color: rgba(255, 255, 255, 0) !important
  border: 0
  background-repeat: no-repeat
  background-size: 75% !important
  background-position: center
  display: flex
  align-items: center
  justify-content: center
  .image
    width: 75%
    height: 100%
    position: relative
    border: 1px solid #888
  &.current

      &:hover .txt
        background: rgba(#000, .8)
        opacity: 1
  .txt
    position: absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
    right: 0
    botom: 0
    opacity: 0
    transition: .5s
    z-index: 999
    display: flex
    flex-direction: column
    .fullheight
      display: flex
      align-items: center
      justify-content: center
      align-self: flex-end
      width: 100%
      height: 100%
</style>
