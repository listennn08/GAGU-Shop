<template lang="pug">
  section.hero-body
    .container
      .columns.is-marginless.is-multiline(
        v-for="(order, index) in orders"
        :key="order.id"
      )
        .column.is-full.is-vcentered
          ul.menu-list
            li
              table.table.is-fullwidth.is-bordered
                thead
                  tr
                    th 訂單編號
                    th 日期
                    th 訂單狀態
                    th 總價
                    th 付款
                tbody
                  tr
                    td.col
                      .txt
                        router-link.is-cus-text(
                          :to='`/payment/${order.id}`'
                        ) {{ order.id | hideTitle }}
                    td.col {{ order.created.datetime }}
                    td.col 已建立
                    td.col {{ order.amount | cash }}
                    td.col
                      div {{ order.payment }}
                      div(:class="paidStatus(order.paid).status") ({{ paidStatus(order.paid).msg }})
            li.has-text-left
              button.button.is-text.is-small(
                @click="toggleCollapse(index)"
              )
                span.icon.is-small
                  font-awesome-icon(:icon="collapseProduct(index)[0]")
                span 看明細
              ul(:class="{'is-hidden': !order.collapse}")
                li(
                  v-for="(products, pIndex) in order.products"
                  :key="products.product.id"
                )
                  table.table.is-fullwidth.has-text-centered
                    td {{ products.product.title }}
                    td {{ products.quantity + products.product.unit }}
                    td {{ itemTotal(index, pIndex) | cash }}
        .column.is-marginless.is-paddingless
          hr.hr
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { getAllOrders } from '@/apis/frontend';

export default {
  created() {
    this.loadOrders();
  },
  computed: {
    ...mapGetters({
      orders: 'order/orders',
    }),
    collapseProduct() {
      return (index) => (this.orders[index].collapse
        ? [['fas', 'minus']]
        : [['fas', 'plus']]);
    },
    paidStatus() {
      return (paid) => (paid
        ? { status: 'has-text-success', msg: '已付款' }
        : { status: 'has-text-danger', msg: '未付款' });
    },
    itemTotal() {
      return (index, pIndex) => {
        const { product, quantity } = this.orders[index].products[pIndex];
        return product.price
          ? product.price * quantity
          : product.origin_price * quantity;
      };
    },
  },
  methods: {
    ...mapActions({
      setMsg: 'setMsg',
      setOrders: 'order/setOrders',
      setOrder: 'order/setOrder',
    }),
    loadOrders() {
      const loader = this.$loading.show();
      getAllOrders()
        .then((resp) => {
          this.setOrders(resp.data.data);
          loader.hide();
        })
        .catch((err) => {
          this.setMsg({
            msg: err.response.message,
            type: false,
          });
          loader.hide();
        });
    },
    toggleCollapse(index) {
      if (this.orders[index].collapse) {
        this.$delete(this.orders[index], 'collapse');
      } else {
        this.$set(this.orders[index], 'collapse', true);
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
.is-cus-text
  position: relative
  &::before
    content: ''
    position: absolute
    background: $navyblue
    height: 1px
    bottom: -1px
    left: 0
    right: 0
    opacity: 0
    transition: .2s
  &:hover::before
    opacity: 1
.table
  td
    width: 20%
    vertical-align: middle
.txt
  display: inline-block
  vertical-align: middle
  width: 100%
  overflow: hidden
  white-space: nowrap
  text-overflow: ellipsis
.hr
  background: transparent
  border: 1px dotted $darkgray

</style>
