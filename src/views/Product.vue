<template lang="pug">
  section.section.is-paddingless
    .container.mt-5
      .card.is-shadowless(v-if="tempProduct")
        .columns.px-2
          span.tag.is-primary.is-fixed.is-uppercase
            | {{ tempProduct.category }}
          .colum.is-img-centered
            .crad-image
              figure.image
                img(:src="tempProduct.imageUrl[0]")
          .column.has-text-left
            h4.title.is-4 {{ tempProduct.title }}
              span(v-if="tempProduct.store < 5").ml-2.tag.is-danger HOT
            .tag.content-tag.is-light.mb-1 產品說明
            section.description.mb-3
              p.is-marginless(
                v-html="descriptionDisplay(tempProduct.content)"
              )
            .tag.content-tag.is-light.mb-1 產品資訊
            section.content.mb-3
              p.is-marginless(
                v-html="descriptionDisplay(tempProduct.description)"
              )
            .tag.content-tag.is-light.mb-1 售價
            .price.is-size-5.has-text-weight-bold.mb-3 {{ tempProduct.price | cash }}
              span.is-size-6(:class="{strike: tempProduct.price}")
                | {{ tempProduct.origin_price | cash }}
            .tag.content-tag.is-light.mb-1 庫存
            p.mb-3 {{ tempProduct.options.store }} {{ tempProduct.unit }}
            .card-foot
              .field.has-addons.has-addons-lefted.mt-1
                .control
                  button.button.is-left(
                    @click="countQuantity('m')"
                    :disabled="quantityMinest"
                  ) &minus;
                .control
                  input.input.has-text-centered(
                    type="number"
                    v-model="tempProduct.quantity"
                    @change="updateCartData()"
                  )
                .control
                  button.button.is-right(
                    @click="countQuantity('p')"
                  ) &plus;
                button.button.is-primary.addCart.mx-2.is-fullwidth(
                  @click="addToCart(tempProduct.id, tempProduct.quantity)"
                  :class="{'is-loading': isLoading}"
                  :disabled="tempProduct.options.store < 1"
                ) 加入購物車
        .columns.is-marginless
          .column
            button.button.is-text.is-pulled-left(
              @click.prevent="$router.push('/products')"
            ) &laquo; 上一頁
        .columns
          .column(v-if="tempProduct.category")
            RandomRecommend(
              title="相關商品"
              titleSide="has-text-left"
              :type="tempProduct.category"
              :id="tempProduct.id"
            )
      .box.is-shadowless.mt-1
        .subtitle.is-4.is-clearfix.has-text-weight-bold.has-text-left 商品評論
        .columns.is-multiline.is-desktop
          .column.is-half-desktop(
            v-for="feeback in tempProduct.options.feeback"
            :key="feeback.id"
          )
            .box
              article.media
                .media-left
                  figure.image.is-64x64
                    img(:src="feeback.pic")
                .media-content
                  .content
                    p.has-text-left
                      strong.is-size-5.mr-2 {{ feeback.id }}
                      span.star(
                        v-for="x in 5"
                        :key="x"
                        :class="fill(x, feeback.star)"
                      ) &#9733;
                      br
                      span.comment {{ feeback.comment }}
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { addCart, getDataDetail } from '@/apis/frontend';
import RandomRecommend from '@/components/RandomRecommend.vue';

export default {
  name: 'Product',
  components: {
    RandomRecommend,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      tempProduct: 'product/tempProduct',
      loading: 'loading',
    }),
    quantityMinest() {
      return this.tempProduct.quantity === 1;
    },
    descriptionDisplay() {
      return (discription) => (discription
        ? discription.replace(/\n/g, '<br>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
        : '');
    },
    fill() {
      return (index, rate) => (index <= rate ? 'fill' : '');
    },
  },
  created() {
    this.getProduct();
  },
  watch: {
    '$route.params': {
      handler() {
        if (this.$route.params !== this.tempProduct.id) {
          this.getProduct();
        }
      },
    },
  },
  methods: {
    ...mapActions({
      setMsg: 'setMsg',
      setTempProduct: 'product/setTempProduct',
      clearTempProduct: 'product/clearTempProduct',
      toggleLoading: 'toggleLoading',
    }),
    getProduct() {
      const loader = this.$loading.show({
        opacity: 1,
      });
      const { id } = this.$route.params;
      getDataDetail(id)
        .then((resp) => {
          const { data } = resp.data;
          data.options = JSON.parse(data.options);
          this.setTempProduct({
            ...data,
            quantity: 1,
          });
          loader.hide();
        });
    },
    countQuantity(operate) {
      const { store } = this.tempProduct.options;
      if (operate === 'm') {
        if (this.tempProduct.quantity > 1) {
          this.tempProduct.quantity -= 1;
        }
      } else if (operate === 'p') {
        if (this.tempProduct.quantity + 1 <= store) {
          this.tempProduct.quantity += 1;
        } else {
          this.setMsg({
            type: false,
            msg: `商品只剩下 ${store} ${this.tempProduct.unit}`,
          });
        }
      }
    },
    updateCartData() {
      const { store } = this.tempProduct.options;
      if (this.tempProduct.quantity < 1) {
        this.tempProduct.quantity = 1;
      } else if (this.tempProduct.quantity > store) {
        this.tempProduct.quantity = store;
        this.setMsg({
          type: false,
          msg: `商品只剩下 ${store} ${this.tempProduct.unit}`,
        });
      }
    },
    addToCart(id, quantity) {
      this.isLoading = true;
      const { store } = this.tempProduct.options;
      if (id && quantity > 0) {
        if (quantity > store) {
          this.setMsg({
            type: false,
            msg: '下單數量超過商品庫存數量！',
          });
          return;
        }
        addCart(id, quantity)
          .then(() => {
            this.setMsg({
              msg: '已加入購物車',
              type: true,
            });
            this.isLoading = false;
          })
          .catch((error) => {
            this.setMsg({
              msg: error.response.data.errors[0],
              type: false,
            });
            this.isLoading = false;
          });
      }
    },
  },
  beforeDestroy() {
    this.clearTempProduct();
  },
};
</script>
<style lang="sass" scoped>
@mixin small
  @media screen and (max-width: 1280px)
    @content
html, body
  height: 100%
  font-family: 'Noto Sans TC', sans serif
section
  height: 100%
.is-fixed
  padding: 1%
  position: absolute
  top: 0
  left: 0
  z-index: 1
.is-img-centered
  display: flex
  align-items: center
  justify-content: center
$darkgrayn: #46505e
.content-tag
  font-size: 16px
  margin: 5px 0
.description
  min-height: 120px
  max-height: 200px
  +small
    max-height: 215px
  overflow: hidden
  text-overflow: ellipsis
  color: $darkgrayn
.content
  min-height: 120px
  max-height: 120px
  overflow: hidden
  text-overflow: ellipsis
  color: $darkgrayn
.content, .price
  margin-bottom: 10px
.star
  color: #ddd
  text-shadow: .05em .05em #aaa
  &.fill
    color: #fd0
.comment
  font-size: 14px
</style>
