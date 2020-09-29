<template lang="pug">
  section.section.is-paddingless
    .container
      .columns.is-multiline.is-marginless.is-variable.is-desktop.is-centered.columns-centered
        .column.is-4-fullhd.is-5-widescreen.is-6-desktop.is-10-tablet.is-full-mobile(
          v-for="(item, index) in products"
          :data-id="item.id"
          :key="index"
        )
          .box.has-text-left.is-rounded(
            :class="{disabled: !item.store}"
            @click="$router.push(`/product/${item.id}`)"
          )
            .card-image.columns.is-marginless.is-cus-centered
              .has-background-primary.has-text-light.is-category {{ item.category }}
              figure.image.is-256x256
                img.is-rounded(:src="item.imageUrl[0]")
            .card-content.is-paddingless.px-2.py-5.mb-auto
              .title.is-4(:title="item.title") {{ item.title }}
              .content.is-marginless {{ item.content | hideContent }}
              .has-text-right.is-marginless
                router-link.descript-link.has-text-weight-bold(
                  @click.stop=""
                  :to="`/product/${item.id}`"
                  :disabled="!item.store"
                ) 查看更多 &raquo;
              .is-marginless
                .price.in-bottom(v-if="item.price")
                    | {{ item.price | cash }}
                    span(
                      :class="{strike: item.price}"
                    ) {{ item.origin_price | cash }}
            .card-footer
              .columns.is-marginless.is-paddingless.is-mobile
                .column.is-6-mobile.is-paddingless
                  .field.has-addons.has-addons-centered.mt-1.is-fullwidth
                    .control
                      button.button.is-left(
                        @click.stop="countQuantity(index, 'm')"
                        :disabled="quantityLimit(index, 'min', item.store)"
                      ) &minus;
                    .control.is-expanded
                      input.input.has-text-centered(
                        type="number"
                        v-model="item.quantity"
                        @click.stop=""
                        @change="updateCartData(index, item.store)"
                        :disabled="!item.store"
                      )
                    .control
                      button.button.is-right(
                        @click.stop="countQuantity(index, 'p')"
                        :disabled="quantityLimit(index, 'max', item.store)"
                      ) &plus;
                  .column.is-paddingless.is-marginless(v-if="item.store === 1")
                    small.has-text-danger 熱銷商品！剩最後一組！
                .column.is-paddingless
                  .field.has-addons.has-addons-centered.mt-1.is-fullwidth
                    .control.is-expanded
                      button.button.is-primary.addCart.ml-1.is-fullwidth(
                        @click.stop="addToCart(index, item.id, item.quantity)"
                        :class="{'is-loading': item.isLoading}"
                        :disabled="!item.store"
                      ) 加入購物車
      template(v-if="showPagination")
        Pagination(:pagination="pagination")
      router-link(to="/shopcart").shop-cart
        .shop-container
          .cart-count(v-if="shopcart.quantity") {{ shopcart.quantity }}
          font-awesome-icon(icon="shopping-cart")
          .txt 購物車
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import {
  getAllProducts, addCart, getCart,
} from '@/apis/frontend';
import ProductCategories from '@/components/ProductCategories.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'ProductList',
  components: {
    ProductCategories,
    Pagination,
  },
  data() {
    return {
      id: null,
      pageOpen: false,
      shopcart: {
        quantity: null,
      },
      pagination: {
        current_page: 1,
      },
    };
  },
  created() {
    this.getData();
    this.getShopcartQuantity();
  },
  watch: {
    'pagination.current_page': {
      handler() {
        const { current_page: cur } = this.pagination;
        const loader = this.$loading.show();
        getAllProducts(cur)
          .then((resp) => {
            this.setProducts([...resp.data.data].map((el) => {
              const tmpEl = el;
              tmpEl.quantity = 1;
              tmpEl.isLoading = false;
              return tmpEl;
            }));
            loader.hide();
          });
      },
    },
  },
  computed: {
    ...mapGetters({
      products: 'product/products',
      category: 'product/category',
    }),
    showPagination() {
      return this.pagination.current_page && this.pagination.total_pages > 1;
    },
    quantityLimit() {
      return (index, type, store) => {
        if (store) {
          if (type === 'min') {
            return this.products[index].quantity === 1;
          }
          return this.products[index].quantity === this.products[index].store;
        }
        return true;
      };
    },
  },
  methods: {
    ...mapActions({
      setMsg: 'setMsg',
      setProducts: 'product/setProducts',
      setPagination: 'setPagination',
      setTempProduct: 'product/setTempProduct',
      togglePage: 'togglePage',
    }),
    getData() {
      const loader = this.$loading.show();
      getAllProducts()
        .then((resp) => {
          this.setProducts([...resp.data.data].map((el) => {
            const tmpEl = el;
            tmpEl.quantity = 1;
            tmpEl.store = parseInt(JSON.parse(tmpEl.options).store, 10);
            tmpEl.isLoading = false;
            return tmpEl;
          }));
          this.pagination = resp.data.meta.pagination;
          loader.hide();
        })
        .catch(() => {
          this.setMsg({
            msg: '載入失敗，請重新載入頁面',
            type: false,
          });
          loader.hide();
        });
    },
    getShopcartQuantity() {
      getCart()
        .then((resp) => {
          this.shopcart.quantity = resp.data.meta.pagination.total;
        });
    },
    countQuantity(pid, operate) {
      if (operate === 'm') {
        if (this.products[pid].quantity > 1) {
          this.products[pid].quantity -= 1;
        }
      } else if (operate === 'p') {
        this.products[pid].quantity += 1;
      }
    },
    updateCartData(index, store) {
      if (this.products[index].quantity < 1) {
        this.products[index].quantity = 1;
      } else if (this.products[index].quantity > store) {
        this.products[index].quantity = store;
      }
    },
    addToCart(index, id, quantity) {
      this.products[index].isLoading = true;
      if (id && quantity > 0) {
        addCart(id, quantity)
          .then(() => {
            this.getShopcartQuantity();
            this.products[index].isLoading = false;
          })
          .catch((error) => {
            this.setMsg({
              msg: error.response.data.errors[0],
              type: false,
            });
            this.products[index].isLoading = false;
          });
      } else {
        this.products[index].isLoading = false;
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
$darkgrayn: #46505e
$lightgray: #F4F3EA

@mixin largeScreen()
  @media screen and (min-width: 1441px)
    @content
@mixin mediumScreen()
  @media screen and (max-width: 1440px)
    @content
@mixin mobileScreen()
  @media screen and (max-width: 760px)
    @content
@mixin xxs()
  @media screen and (max-width: 320px)
    @content
.section
  min-height: 100%
.box
  transition: .5s
  cursor: pointer
  &:hover
    box-shadow: 3px 3px 6px rgba($navyblue, .6)
  &.disabled
    cursor: default
    pointer-events: none
    position: relative
    &::before
      content: 'SOLD OUT'
      position: absolute
      width: 70%
      height: 45%
      padding: 25% 5%
      top: 25%
      left: 15%
      border: 3px solid #888
      border-radius: 50%
      box-sizing: border-box
      text-align: center
      transform: rotate(-30deg)
      color: #888
      text-shadow: 3px 3px 3px #444
      font-size: 36px
      font-weight: 900
      z-index: 3
      +xxs
        height: 38%
        padding: 18% 5%
    &::after
      content: ''
      position: absolute
      width: 100%
      height: 100%
      background: rgba(#ddd, .4)
      z-index: 2
      top: 0
      left: 0
    &:hover
      box-shadow: none

.columns-centered
  display: flex
  justify-content: flex-start
  +mobileScreen
    justify-content: center
.is-cus-centered
  display: flex
  justify-content: center
  align-items: center
.title
  color: $navyblue
  width: 100%
  font-size: 18px
  font-weight: 700
  white-space: nowrap
  text-overflow: ellipsis
  overflow: hidden
.is-category
  position: absolute
  left: 0
  top: 0
  width: 30%
  text-align: center
  padding: 1% 2%
  border-radius: 10px
  font-size: 12px
  text-transform: uppercase
  z-index: 2
.media-left, .image .is-rounded
  border-radius: 15px
.content
  min-height: 70px
  max-height: 70px
  overflow: hidden
  text-overflow: ellipsis
  color: $darkgrayn
.descript-link
  position: relative
  &::before
    content: ''
    position: absolute
    height: 1px
    left: 0
    right: 100%
    bottom: -1px
    background: $navyblue
    transition: .5s
  &:hover::before
    right: 0
.shop-cart
  width: 65px
  height: 65px
  padding: 5px 10px 10px
  font-size: 20px
  border: 2px solid $darkgray
  border-radius: 50%
  position: fixed
  right: 2%
  bottom: 2%
  color: $navyblue
  text-align: center
  transition: .5s
  text-decoration: none
  background: $lightgray
  z-index: 5
  cursor: pointer
  +largeScreen
    right: 5%
    bottom: 4%
  &:hover
    box-shadow: 2px 2px 4px $goldyellow
    text-decoration: underline
.shop-container
  position: relative
  .cart-count
    position: absolute
    top: -15px
    right: -10px
    background: #ff0000
    color: #fff
    font-size: 12px
    width: 20px
    height: 20px
    border-radius: 50%
    box-shadow: 2px 2px 5px rgba(#dd0000, .8)
  .txt
    font-size: 6px
    overflow-wrap: nowrap
</style>
