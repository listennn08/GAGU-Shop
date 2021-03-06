<template lang="pug">
  .order
    h4.h4t.has-text-left
      font-awesome-icon.icon.is-small(:icon="['far', 'clipboard']")
      span &nbsp; 購物清單
    .list(:class="{hide: !isCollapse}")
      .columns.is-marginless.has-text-centered.is-vcentered(
        v-for="prod in order.products"
        :key="prod.product.id"
      )
        .column.is-paddingless.is-marginless.is-3.mobile
          .box.is-shadowless.py-1.px-2
            .media
              .media-left
                figure.image.is-64x64.is-inline-block.mr-1
                  img(:src="prod.product.imageUrl[0]")
              .content
                .is-5.has-text-weight-bold {{ prod.product.title }}
                p.is-marginless x{{ prod.quantity }}
                p.is-marginless {{ prod.product.price | cash }}
        .column.desktop
          figure.image.is-128x128
            img(:src="prod.product.imageUrl[0]")
        .column.desktop {{ prod.product.title }}
        .column.desktop x{{ prod.quantity }}
        .column.desktop {{ prod.product.price | cash }}
    .columns.is-marginless.collapse.is-centered(
      v-if="showCollapseButton"
    )
      .column.is-full
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
        td.has-text-weight-bold(:class="paidStatus.status") {{ paidStatus.msg }}
    button.button.is-primary(
      :class="{'is-loading': loading}"
      v-if="!order.paid"
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
        this.setCurrentStep(this.order.paid ? 3 : 2);
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
    showCollapseButton() {
      return this.order.products
        ? this.order.products.length > 2
        : false;
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
      setCurrentStep: 'setCurrentStep',
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
          this.setCurrentStep(3);
          this.$router.push(`/paysuccess/${resp.data.data.id}`);
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
@mixin pad
  @media screen and (max-width: 768px)
    @content
@mixin mobile-large
  @media screen and (max-width: 414px)
    @content
@mixin mobile
  @media screen and (max-width: 413px) and (min-width: 375px)
    @content
@mixin xxs
  @media screen and (max-width: 375px)
    @content

.list
  overflow: hidden
  &.hide
    max-height: 450px
    +pad
      max-height: 300px
    +mobile-large
      max-height: 190px
    +mobile
      max-height: 200px
    +xxs
      max-height: 210px
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
section
  padding: 20px 0 100px
</style>
