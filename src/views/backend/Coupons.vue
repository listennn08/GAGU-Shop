<template lang="pug">
  .container.is-fluid
    button.button.is-cus-primary.is-pulled-right(
      data-action="add"
      @click="openPage()"
    )
      span.icon.is-small: font-awesome-icon(:icon="['fas', 'plus']")
      span 新增
    table.table.is-fullwidth
      tr.has-cus-background-dark
        th.has-text-light 折扣名稱
        th.has-text-light 折扣碼
        th.has-text-light 折扣
        th.has-text-light 啟用狀態
        th.has-text-light 到期日
        th.has-text-light 編輯
      tr.item-list(
        v-for="(item, index) in coupons"
        :key="item.id"
        :data-id="item.id"
        :data-index="index"
      )
        td.col
          .text {{ item.title }}
        td.col
          .text {{ item.code }}
        td.col
          .text {{ item.percent }}%
        td.col
          .control
            input.switch(
              :class="{'is-success': item.enabled}"
              :id="item.id"
              type="checkbox"
              v-model="item.enabled"
              @change="changeAttr(index)"
            )
            label(
                :for="item.id"
            ) {{ checkEnabled(item.enabled) }}
        td.col
          .text {{ item.deadline.datetime }}
        td.col
          .buttons.is-centered
            button.button(
              data-action="update"
              @click="openPage(index)"
            )
              span.icon.is-small: font-awesome-icon(:icon="['fas', 'edit']")
              span 修改
            button.button(
              :class="{'is-loading': loading}"
              @click="deleteProduct(index)"
            )
              span.icon.is-small: font-awesome-icon(:icon="['fas', 'trash-alt']")
              span 刪除
    Coupon(
      :class="{'is-active': page.open}"
    )
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { getBackendAllCupons, updateCuponData } from '@/apis/backend';
import Coupon from './Coupon.vue';

export default {
  name: 'Coupons',
  components: {
    Coupon,
  },
  data() {
    return {
      loading: false,
    };
  },
  created() {
    const loader = this.$loading.show();
    getBackendAllCupons()
      .then((resp) => {
        this.setCoupons(resp.data.data);
        loader.hide();
      });
  },
  computed: {
    ...mapGetters({
      coupons: 'coupon/coupons',
      page: 'page',
    }),
    checkEnabled() {
      return (enabled) => (enabled ? '啟用' : '未啟用');
    },
  },
  methods: {
    ...mapActions({
      setMsg: 'setMsg',
      setCoupons: 'coupon/setCoupons',
      setCoupon: 'coupon/setCoupon',
      togglePage: 'togglePage',
    }),
    openPage(...args) {
      if (typeof args[0] === 'number') {
        this.setCoupon(this.coupons[args[0]]);
      }
      this.togglePage();
    },
    changeAttr(index) {
      const attr = this.coupons[index].enabled ? '啟用' : '停用';
      updateCuponData(this.coupons[index].id, this.coupons[index])
        .then(() => {
          this.setMsg({
            msg: `已${attr}`,
            type: true,
          });
        })
        .catch(() => {
          this.coupons[index].enabled = !this.coupons[index].enabled;
          this.setMsg({
            msg: `${attr}失敗`,
            type: false,
          });
        });
    },
  },
  beforeDestroy() {
    if (this.page.open) {
      this.togglePage();
    }
  },
};
</script>
<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;900&family=Raleway:wght@500;700&display=swap')
$navyblue: #333D51
$hnavyblue: #242b39
$goldyellow: #D3AC2B
$darkgray: #CBD0D8
$darkgrayn: #46505e
$lightgray: #F4F3EA
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
