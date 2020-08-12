<template lang="pug">
  section
    .hero-body
      .container
        h4.h4t.has-text-left
          font-awesome-icon.icon.is-small(:icon="['far', 'clipboard']")
          span &nbsp; 購物清單
        .list(:class="{hide: !isCollapse}")
          .columns.is-marginless.has-text-centered.is-vcentered(
            v-for="prod in order.products"
            :key="prod.product.id"
          )
            .column
              figure.image.is-128x128
                img(:src="prod.product.imageUrl[0]")
            .column {{ prod.product.title }}
            .column x{{ prod.quantity }}
            .column
              .is-font-raleway {{ prod.product.price | cash }}
        .collapse
          .horizon(v-if="!isCollapse") ⋯
          button.collapse__btn(
            :class="collapseIcon"
            @click="toggleCollapse()"
          )
            font-awesome-icon(
              :icon="['fas', isCollapse?'angle-double-up' : 'angle-double-down']"
            )
        h4.h4t.has-text-left
          font-awesome-icon.titleIcon(:icon="['fas', 'info-circle']")
          | &nbsp; 訂單資訊
        table.table.is-fullwidth(v-if="order.user")
          tr
            td 姓名
            td {{ order.user.name }}
          tr
            td 電話
            td {{ order.user.tel }}
          tr
            td 信箱
            td {{ order.user.email }}
          tr
            td 地址
            td {{ order.user.address }}
          tr
            td 付款方式
            td {{ order.payment }}
          tr
            td 付款狀態
            td(:class="paidStatus.status") {{ paidStatus.msg }}
        button.button.is-cus-primary(
          :class="{'is-loading': loading}"
          @click="doPay(order.id)"
        ) 確認付款

</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { getOrder, payOrder } from '@/apis/frontend';

export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  created() {
    const loader = this.$loading.show();
    const { id } = this.$route.params;
    getOrder(id)
      .then((resp) => {
        this.setOrder(resp.data.data);
        loader.hide();
      });
  },
  computed: {
    ...mapGetters({
      order: 'order/order',
      loading: 'loading',
    }),
    collapseIcon() {
      return this.isCollapse ? 'up' : 'down';
    },
    paidStatus() {
      return (this.order.paid
        ? { status: 'has-text-success', msg: '已付款' }
        : { status: 'has-text-danger', msg: '未付款' });
    },
  },
  methods: {
    ...mapActions({
      setMsg: 'setMsg',
      setOrder: 'order/setOrder',
      toggleLoading: 'toggleLoading',
    }),
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    doPay(id) {
      this.toggleLoading();
      payOrder(id)
        .then((resp) => {
          this.setOrder(resp.data.data);
          this.toggleLoading();
          this.setMsg({
            msg: '付款完成！',
            type: true,
          });
        })
        .catch(() => {
          this.toggleLoading();
          this.setMsg({
            msg: '付款失敗！',
            type: false,
          });
        });
    },
  },
};
</script>
<style lang="sass" scoped>
@keyframes collapseAnimation
  0%
    transform: translateY(0)
  50%
    transform: translateY(10%)
  100%
    transform: translateY(20%)
.collapse__btn
  cursor: pointer
  padding: 1% 2%
  border: 0
  background: transparent
  outline: none
  transform: translateY(0)
  &.down
    animation: collapseAnimation 1s infinite linear forwards
  &.up
    animation: collapseAnimation 1s infinite linear reverse forwards
  &:hover
    animation-play-state: paused
.horizon
  font-weight: 700
  writing-mode: vertical-rl
</style>
