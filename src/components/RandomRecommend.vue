<template lang="pug">
  .box.is-shadowless.mt-1
    .subtitle.is-4.is-clearfix.has-text-weight-bold.has-text-centered {{ title }}
    .columns.is-multiline.is-gapless
      .column.is-third-four(
        v-for="data in recommend"
      )
        figure.image.1by1
          img(:src="data.imageUrl[0]")
          .txt.has-text-left.px-2.py-2
            .has-text-light.mh-70 {{ data.title }}
            .has-text-light
              span {{ data.price | cash }}
              del.ml-1: small.has-text-lightgray {{ data.origin_price | cash }}
            .fullheight.has-centered
              router-link.button.is-outlined.is-warning(:to="`product/${data.id}`") 查看更多
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

</style>
