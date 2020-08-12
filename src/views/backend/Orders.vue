<template lang="pug">
  .container.is-fluid
    table.table.is-fullwidth.mt-5
      tr.has-cus-background-dark.has-text-wieght-bold
        th.has-text-light 訂單編號
        th.has-text-light 購買商品
        th.has-text-light 總額
        th.has-text-light 付款方式
        th.has-text-light 付款狀態
        th.has-text-light 編輯
      tr.item-list(
        v-for="(item, index) in orders"
        :key="item.id"
        :data-id="item.id"
        :data-index="index"
      )
        td.col
          .text {{ item.id }}
        td.col
          .text(
            v-for="prod in item.products"
            :key="prod.id"
          ) {{ prod.product.title }}
        td.col.raleway
          .text {{ item.amount | cash }}
        td.col
          .text {{ item.payment }}
        td.col
          .field
            input.switch(
              :class="{'is-success': item.paid}"
              :id="item.id"
              type="checkbox"
              v-model="item.paid"
              @change="changePay(item.id, item.paid)"
            )
            label(
              :for="item.id"
            ) {{ checkPaid(item.paid) }}
        td.col
          .buttons.is-centered
            button.button(
              data-action="update"
              @click="openPage(index)"
              disabled
            )
              span.icon.is-small: font-awesome-icon(:icon="['fas', 'edit']")
              span 修改
            button.button(
              :class="{'is-loading': loading}"
              @click="deleteProduct(index)"
            )
              span.icon.is-small: font-awesome-icon(:icon="['fas', 'trash-alt']")
              span 刪除
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { getBackendOrders, changeOrderPayment } from '@/apis/backend';

export default {
  data() {
    return {
      loading: false,
    };
  },
  created() {
    const loader = this.$loading.show();
    getBackendOrders()
      .then((resp) => {
        this.setOrders(resp.data.data);
        loader.hide();
      });
  },
  computed: {
    ...mapGetters({
      orders: 'order/orders',
    }),
    checkPaid() {
      return (paid) => (paid ? '已付款' : '未付款');
    },
  },
  methods: {
    ...mapActions({
      setOrders: 'order/setOrders',
    }),
    changePay(id, pay) {
      return changeOrderPayment(id, pay)
        .then(() => {})
        .catch(() => {
          this.orders.forEach((el) => {
            const newEl = el;
            if (el.id === id) {
              newEl.paid = !pay;
            }
            return newEl;
          });
        });
    },
  },
};
</script>
<style lang="sass" scoped>
@import url(https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;700&family=Raleway:wght@500;700&display=swap)
$navyblue: #333D51
$hnavyblue: #242b39
$goldyellow: #D3AC2B
$darkgray: #CBD0D8
$darkgrayn: #46505e
$lightgray: #F4F3EA
*
  font-family: 'Noto Sans TC', sans serif
.is-cus-primary
  background: $navyblue
  color: $lightgray
  transition: .2s
  &:hover
    background: $hnavyblue
    color: #fff
  &:focus
    background: $hnavyblue
    color: #fff
.table
  border: 1px solid $navyblue
  td
    padding: 0.5rem
    vertical-align: middle
.has-cus-background-dark
  background: $navyblue
.has-text-light
  border: 1px solid $lightgray
  &:first-of-type
    border-left: 1px solid $navyblue
  &:last-of-type
    border-right: 1px solid $navyblue
.circle
  position: fixed
  box-shadow: 2px 2px 5px $navyblue
  width: 36px
  border-radius: 50%
  bottom: 2%
  right: 2%
  z-index: 888
  transition: .5s
  transform: translate(210%, 0)
  &.show
    transform: translate(0, 0)
  &:hover
    transform: translate(0, -10%)
.item-list
  border-top: 1px solid $navyblue
  border-left: 1px solid $navyblue
  font-weight: 500
  font-family: 'Noto Sans TC', sans-serif
.raleway
  font-family: 'Raleway', sans-serif
.col
  border: 1px solid $navyblue
  width: 8%
  height: 200px
  background-position: left
  background-repeat: no-repeat
  background-size: cover
  max-width: 100px
  white-space: nowrap
  &:first-of-type, &:nth-of-type(6), &:nth-of-type(7),  &:nth-of-type(8)
    text-transform: uppercase
    font-family: 'Raleway', sans-serif
  .text
    width: 100%
    padding: 2%
    text-align: center
    overflow: hidden
    text-overflow: ellipsis
  .check
    color: green
  .times
    color: red
</style>
