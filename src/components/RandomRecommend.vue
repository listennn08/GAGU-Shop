<template lang="pug">
  .box.is-shadowless.mt-1.cursor
    .subtitle.is-4.is-clearfix.has-text-weight-bold(:class="titleSide") {{ title }}
    .columns.is-multiline.is-desktop(:class="center")
      .column.is-one-third-fullhd.is-one-third-widescreen.is-three-fifths-desktop(
        v-for="data in recommend"
        @click="goTo(data.id)"
      )
        .box.rdn-card
          section.media
            .media-left
              figure.image
                img(:src="data.imageUrl[0]")
            .media-content
              .content
                p.mh-70.card-title {{ data.title }}
                .has-text-primary
                  span.is-font-raleway {{ data.price | cash }}
                  del.ml-1: small.has-text-lightgray.is-font-raleway
                    | {{ data.origin_price | cash }}
                button.button.is-primary.is-small(
                  @click.stop="goTo(data.id)"
                ) 查看更多
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
    titleSide: {
      type: String,
      default: 'has-text-centered',
    },
    centered: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
    id: {
      type: String,
    },
  },
  data() {
    return {
      recommend: [],
    };
  },
  computed: {
    center() {
      return (this.centered ? 'is-centered' : '');
    },
  },
  created() {
    this.getRandomProducts();
  },
  watch: {
    '$route.params': {
      handler() {
        if (this.$route.params !== this.id) {
          this.recommend = [];
          this.getRandomProducts();
        }
      },
    },
  },
  methods: {
    async getRandomProducts() {
      const resp = await getAllProducts();
      const { data } = resp.data;
      if (this.type === 'all') {
        const { total } = resp.data.meta.pagination;
        const randomArray = Array.from({ length: total })
          .map((el, i) => i)
          .sort(() => 0.5 - Math.random())
          .filter((el, i) => i < 5);
        randomArray.forEach((el) => { this.recommend.push(data[el]); });
      } else {
        const filterIndexs = [];
        const filterData = data.filter((el, index) => {
          if (el.category === this.type) {
            filterIndexs.push(index);
          }
          return el.category === this.type;
        });
        const randomArray = Array.from({ length: filterData.length + (5 - filterData.length) })
          .map((el, i) => i)
          .sort(() => 0.5 - Math.random())
          .filter((el, i) => i <= 3);
        randomArray.forEach((el) => {
          if (filterData[el]) {
            if (filterData[el].id !== this.id) {
              this.recommend.push(filterData[el]);
            }
          }
        });
        const d = data.sort(() => 0.5 - Math.random()).slice(0, 3 - this.recommend.length);
        this.recommend.push(...d);
      }
    },
    goTo(path) {
      if (this.$route.path.indexOf('product') > -1) {
        this.$router.push(path);
      } else {
        this.$router.push(`product/${path}`);
      }
    },
  },
};
</script>
<style lang="sass" scoped>
@mixin tablet
  @media screen and (min-width: 576px) and (max-width: 767px)
    @content
@mixin desktop
  @media screen and (min-width: 768px) and (max-width: 992px)
    @content
@mixin widescreen
  @media screen and (min-width: 993px)
    @content
.rdn-card
  display: flex
  justify-content: flex-start
  border: 1px solid transparent
  overflow: hidden
  border-radius: 6px
  .media-left
    width: 50%
    .image
      width: 100%
.media-content
  height: 100%
  display: flex
  align-items: center
.card-title
  width: 100%
    // transform: perspective(800px)
    // transform-style: preserve-3d
//   &:hover
//     border: 1px solid #ddd
//     border-radius: 6px
//     .card-info
//       top: 15%
//       z-index: 2
//       .des
//         opacity: 1
//       +tablet
//         top: 8%
//       +desktop
//         top: 10%
//   &::before
//     content: ''
//     position: absolute
//     top: 0
//     bottom: 0
//     left: 0
//     right: 0
//     background: rgba(#aaa , .4)
//     opacity: 0
//     transition: .6s
//     z-index: 1
//   &:hover::before
//     opacity: 1
// .image
//   position: relative
//   cursor: pointer
//   &::before
//     content: ''
//     position: absolute
//     height: 100%
//     left: 0
//     right: 100%
//     transition: .5s
//     border-radius: 6px
//     right: 0
// .card-info
//   align-self: flex-start
//   position: absolute
//   padding: 2%
//   top: 72%
//   bottom: 0
//   transition: top .5s
//   h4
//     text-shadow: rgba(#ddd, .8) 0.1em 0.1em 1px
//   .des
//     line-height: 20px
//     opacity: 0
//     text-shadow: rgba(#ddd, .8) 0.1em 0.1em 1px
//     transition: opacity 1s
//   +desktop
//     top: 74%
//   +tablet
//     top: 68%
.cursor
  cursor: pointer
</style>
