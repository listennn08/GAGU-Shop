<template lang="pug">
  .container.mt-5
    .card.mt-2(v-if="tempProduct")
      .columns
        span.tag.is-warning.is-fixed.is-uppercase
          | {{ tempProduct.category }}
        .colum
          .crad-image
            figure.image
              img(:src="tempProduct.imageUrl[0]")
        .column.has-text-left
          h4.title.is-4 {{ tempProduct.title }}
          .tag.is-warning 產品說明
          p.content {{ tempProduct.content }}
          .tag.is-warning 產品資訊
          p.content {{ tempProduct.description }}
          .tag.is-warning 售價
          .price.is-size-5.has-text-weight-bold {{ tempProduct.price | cash }}
            span.is-size-6(:class="{strike: tempProduct.price}")
              | {{ tempProduct.origin_price | cash }}
          .card-foot
            .field.has-addons.has-addons-lefted.mt-1
              .control
                button.button.is-left(
                  @click="countQuantity('m')"
                ) &minus;
              .control
                input.input.has-text-centered(
                  type="number"
                  v-model="tempProduct.quantity"
                  @change="updateCartData(index)"
                )
              .control
                button.button.is-right(
                  @click="countQuantity('p')"
                ) &plus;
              button.button.is-cus-primary.addCart.mx-2.is-fullwidth(
                @click="addToCart(tempProduct.id, tempProduct.quantity)"
                :class="{'is-loading': isLoading}"
              ) 加入購物車
    button.button.is-text.my-5.is-pulled-left(
      @click.prevent="$router.go(-1)"
    ) &laquo; 上一頁
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { addCart, getDataDetail } from '@/apis/frontend';

export default {
  name: 'product',
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
  },
  created() {
    const loader = this.$loading.show({
      opacity: 1,
    });
    const { id } = this.$route.params;
    getDataDetail(id)
      .then((resp) => {
        this.setTempProduct({
          ...resp.data.data,
          quantity: 1,
        });
        loader.hide();
      });
  },
  methods: {
    ...mapActions({
      setMsg: 'setMsg',
      setTempProduct: 'product/setTempProduct',
      clearTempProduct: 'product/clearTempProduct',
      toggleLoading: 'toggleLoading',
    }),
    countQuantity(operate) {
      if (operate === 'm') {
        if (this.tempProduct.quantity > 1) {
          this.tempProduct.quantity -= 1;
        }
      } else if (operate === 'p') {
        this.tempProduct.quantity += 1;
      }
    },
    addToCart(id, quantity) {
      this.isLoading = true;
      if (id && quantity) {
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
.is-fixed
  width: 5%
  padding: 1% 4%
  position: absolute
  top: 0
  left: 0
  z-index: 1
.is-font-raleway
  font-family: 'Raleway', sans serif
$darkgrayn: #46505e
.content
  min-height: 120px
  max-height: 120px
  overflow: hidden
  text-overflow: ellipsis
  color: $darkgrayn
</style>
