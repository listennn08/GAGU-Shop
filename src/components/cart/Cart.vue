<template lang="pug">
  section.section.is-paddingless
    .container(v-if="shopcartItems.length > 0")
      .action
        button.button.is-light.my-2(
          @click="deleteCartData()"
          ref="removeAllContainer") 刪除所有商品
      table.table.is-fullwidth.desktop
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
          tr(
            v-for="(item, index) in shopcartItems"
            :key="item.product.id"
          )
            td.is-vcentered(scoped="row") {{ index+1 }}
            td.is-cus-centered
              figure.image.is-128x128
                img(:src="item.product.imageUrl[0]")
            td.is-vcentered
              .item-name {{ item.product.title | hideTitle }}
            td.is-vcentered
              .price.has-text-centered(v-if="item.product.price")
                | {{ item.product.price | cash }}
                span(:class="{strike: item.product.price}")
                  | {{ item.product.origin_price | cash }}
            td.is-vcentered
              .field.has-addons.has-addons-centered
                .control
                  button.button.is-left.is-small(
                    @click="countQuantity(index, 'm')"
                    :disabled="quantityMinest(index)"
                  ) &minus;
                .control
                  input.input.has-text-centered.is-small(
                    type="number"
                    v-model="item.quantity"
                    @change="updateCartData(index)"
                  )
                .control
                  button.button.is-right.is-small(@click="countQuantity(index, 'p')") &plus;
            td.item-total.is-vcentered {{ itemTotal(index) | cash }}
            td.is-vcentered
              button.button.is-text.is-underlineless.remove(
                :class="{'is-loading': item.removing}"
                @click="deleteCartData(index)"
              ) &times;
        tr.total
          td 小計
          td(colspan=4)
          td {{ countAll | cash }}
          td
      .mobile.mb-2
        .box.is-shadowless(
          v-for="(item, index) in shopcartItems"
          :key="item.product.id"
        )
          .media
            .media-left
              figure.image.is-64x64
                img(:src="item.product.imageUrl[0]")
            .content.has-text-left
              button.button.is-text.is-underlineless.remove.is-pulled-right(
                :class="{'is-loading': item.removing}"
                @click="deleteCartData(index)"
              ) &times;
              p.item-name.is-sizs-6 {{ item.product.title }}
              .price.has-text-righted(v-if="item.product.price")
                | {{ item.product.price | cash }}
              .field.has-addons.has-addons-centered
                .control
                  button.button.is-left.is-small(
                    @click="countQuantity(index, 'm')"
                    :disabled="quantityMinest(index)"
                  ) &minus;
                .control
                  input.input.has-text-centered.is-small(
                    type="number"
                    v-model="item.quantity"
                    @change="updateCartData(index)"
                  )
                .control
                  button.button.is-right.is-small(@click="countQuantity(index, 'p')") &plus;
        .total 小計: {{ countAll | cash }}
      .shopcart-checkout.buttons.is-fullwidth.is-right-desktop.is-center-mobile
        button.button.is-light.continueshop(
          @click="$router.push('products')"
        ) &lsaquo;&lsaquo;&nbsp;繼續購物
        button.button.is-primary.checkout(
          @click="$router.push('checkout')"
        ) 去結帳 &rsaquo;&rsaquo;
    .container(v-else)
      NoCart
    RandomRecommend(
      title="精選推薦"
      type="all"
    )
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import {
  getCart, updateCart, deleteCart,
} from '@/apis/frontend';
import NoCart from '@/components/cart/NoCart.vue';
import RandomRecommend from '@/components/RandomRecommend.vue';

export default {
  name: 'Cart',
  components: {
    NoCart,
    RandomRecommend,
  },

  created() {
    this.getShopCartData();
  },
  computed: {
    ...mapGetters({
      shopcartItems: 'shopcart/shopcartItems',
    }),
    countAll() {
      return this.shopcartItems.reduce(
        (pre, cur) => pre + (cur.quantity * (cur.product.price
          ? cur.product.price
          : cur.product.origin_price)),
        0,
      );
    },
    itemTotal() {
      return (index) => (this.shopcartItems[index].quantity
        * (this.shopcartItems[index].product.price
          ? this.shopcartItems[index].product.price
          : this.shopcartItems[index].product.origin_price));
    },
    quantityMinest() {
      return (index) => this.shopcartItems[index].quantity === 1;
    },
  },
  methods: {
    ...mapActions({
      setShopcartItems: 'shopcart/setShopcartItems',
      deleteItem: 'shopcart/deleteItem',
      deleteAllItem: 'shopcart/deleteAllItem',
    }),
    getShopCartData() {
      const loader = this.$loading.show();
      getCart()
        .then((resp) => {
          this.setShopcartItems([...resp.data.data].map((el) => {
            const tmpEl = el;
            tmpEl.removing = false;
            return tmpEl;
          }));
          loader.hide();
        });
    },
    countQuantity(index, operate) {
      if (operate === 'm') {
        if (this.shopcartItems[index].quantity > 1) {
          this.shopcartItems[index].quantity -= 1;
        }
      } else if (operate === 'p') {
        this.shopcartItems[index].quantity += 1;
      }
      this.updateCartData(index);
    },
    updateCartData(index) {
      const quantity = this.shopcartItems[index];
      if (this.shopcartItems[index].quantity < 1) {
        this.shopcartItems[index].quantity = 1;
      }
      if (quantity !== this.shopcartItems[index].quantity) {
        updateCart(this.shopcartItems[index].product.id, this.shopcartItems[index].quantity);
      }
    },
    deleteCartData(index) {
      if (index || index === 0) {
        this.shopcartItems[index].removing = true;
        deleteCart(this.shopcartItems[index].product.id)
          .then(() => {
            this.deleteItem(index);
          });
      } else {
        const loader = this.$loading.show({
          container: this.$refs.removeAllContainer,
          isFullPage: false,
        });
        deleteCart()
          .then(() => {
            this.deleteAllItem();
            loader.hide();
          });
      }
    },
  },
};
</script>
<style lang="sass" scoped>
@mixin desktop()
  @media screen and (min-width: 767px)
    @content
@mixin mobile()
  @media screen and (max-width: 767px)
    @content
.media-left
  margin: auto 1rem auto 0
.is-cus-centered
  display: inline-block
  text-align: center
.action
  text-align: right
.is-right-desktop
  +desktop
    justify-content: flex-end
.is-center-mobile
  +mobile
    justify-content: center
.mobile
  .total
    text-align: right
    margin-right: 5%
</style>
