<template lang="pug">
  .container.is-fluid
    .container(v-if="products && products.length > 0")
      button.button.is-text.is-outlined.is-pulled-right.my-2.removeAll(
        @click="deleteCartData()"
        ref="removeAllContainer") 刪除所有商品
      table.table.is-fullwidth
        thead
          tr
            th 編號
            th 圖示
            th 產品名稱
            th 售價
            th 購買數量
            th 總價
            th 移除
        tbody(ref="preivew")
          tr.has-text-justified(v-for="(item, index) in products" :key="item.product.id")
            td(scoped="row") {{ index+1 }}
            td
              figure.image.is-128x128
                img(:src="item.product.imageUrl[0]")
            td
              .item-name {{ item.product.title | hideTitle }}
            td
              .price(v-if="item.product.price")
                | {{ item.product.price | cash }}
                span(:class="{strike: item.product.price}")
                  | {{ item.product.origin_price | cash }}
            td
              .field.has-addons.has-addons-centered
                .control
                  button.button.is-left.is-small(
                    @click="countQuantity(index, 'm')"
                    disabled
                  ) &minus;
                .control
                  input.input.has-text-centered.is-small(
                    type="number"
                    v-model="item.quantity"
                    @change="updateCartData(index)"
                  )
                .control
                  button.button.is-right.is-small(@click="countQuantity(index, 'p')") &plus;
            td.item-total {{ itemTotal(index) | cash }}
            td
              button.button.is-text.is-underlineless.remove(
                :class="{'is-loading': item.removing}"
                @click="deleteCartData(index)"
              ) &times;
        tr.total
          td 小計
          td(colspan=4)
          td {{ countAll | cash }}
          td
      .shopcart-checkout.buttons.is-pulled-right
        button.button.is-outline.is-cus-primary.continueshop(
          @click="$router.push('products')"
        ) &lsaquo;&lsaquo;&nbsp;繼續購物
        button.button.is-cus-primary.checkout(
          @click="$router.push('checkout')"
        ) 去結帳 &rsaquo;&rsaquo;
    .container(v-else)
      .noItemAlert
        | 還沒有把喜愛的商品加入購物車唷
        | 趕快去購物吧！
      .shopcart-checkout
        button.button.is-cus-primary.continueshop(
          @click="$router.push('products')" ) &lsaquo;&lsaquo;繼續購物
</template>
<script>
import { getCart, updateCart, deleteCart } from '@/apis/frontend';

export default {
  data() {
    return {
      products: [],
      productCheck: [],
    };
  },
  created() {
    this.getShopCartData();
  },
  computed: {
    countAll() {
      return this.products.reduce(
        (pre, cur) => pre + (cur.quantity * (cur.product.price
          ? cur.product.price
          : cur.product.origin_price)),
        0,
      );
    },
    itemTotal() {
      return (index) => (this.products[index].quantity * (this.products[index].product.price
        ? this.products[index].product.price
        : this.products[index].product.origin_price));
    },
  },
  methods: {
    getShopCartData() {
      const loader = this.$loading.show();
      getCart()
        .then((resp) => {
          this.products = [...resp.data.data].map((el) => {
            const tmpEl = el;
            tmpEl.removing = false;
            return tmpEl;
          });
          loader.hide();
        });
    },
    countQuantity(i, operate) {
      if (operate === 'm') {
        if (this.products[i].quantity > 1) {
          this.products[i].quantity -= 1;
        }
      } else if (operate === 'p') {
        this.products[i].quantity += 1;
      }
      this.updateCartData(i);
    },
    updateCartData(i) {
      const quantity = this.products[i];
      if (this.products[i].quantity < 1) {
        this.products[i].quantity = 1;
      }
      if (quantity !== this.products[i].quantity) {
        updateCart(this.products[i].product.id, this.products[i].quantity);
      }
    },
    deleteCartData(i) {
      if (i || i === 0) {
        this.products[i].removing = true;
        deleteCart(this.products[i].product.id)
          .then(() => {
            this.products.splice(i, 1);
            this.products[i].removing = false;
          });
      } else {
        const loader = this.$loading.show({
          container: this.$refs.removeAllContainer,
          isFullPage: false,
        });
        deleteCart()
          .then(() => {
            this.products = [];
            loader.hide();
          });
      }
    },
  },
};
</script>
<style lang="sass" scoped>
$navyblue: #333D51
$hnavyblue: #242b39
$goldyellow: #D3AC2B
$darkgray: #CBD0D8
$lightgray: #F4F3EA

@keyframes checkBtnAnimation
  0%
    transform: translateX(10%)
  50%
    transform: translateX(20%)
  100%
    transform: translateX(30%)
@keyframes continueBtnAnimation
  0%
    transform: translateX(-10%)
  50%
    transform: translateX(-20%)
  100%
    transform: translateX(-30%)

*
  font-family: 'Noto Sans TC', sans serif
.table
  td
    width: 15%
    padding: 1rem
    text-align: center
    vertical-align: middle
.price
  width: 100%
  text-align: left
  font-family: 'Raleway', sans-serif
  font-weight: 500
  span.strike
    margin-left: 1%
    font-size: 12px
    text-decoration: line-through
    color: #888
  &.in-bottom
    margin-top: auto
.item-total
  font-family: 'Raleway', sans-serif
.total
  td
    font-family: 'Raleway', sans-serif
.checkout
  &:hover
    background: $hnavyblue
    animation: checkBtnAnimation 2s .1s infinite linear forwards
  &:hover a
    color: $lightgray
.continueshop
  &:hover
    background: $hnavyblue
    animation: continueBtnAnimation 2s .1s infinite linear forwards
    &:hover a
      color: $lightgray
</style>
