<template lang="pug">
  .modal
    .modal-background(@click="cancel()")
    .modal-card
      header.modal-card-head
          h4.is-size-4 {{ title }}優惠
      section.modal-card-body
        .modal-conetnt
          .field.has-text-left
            label 名稱
            .control
              input.input(
                type="text"
                v-model="coupon.title"
              )
            label 折扣碼
            .control
              input.input(
                type="text"
                v-model="coupon.code"
              )
            label 折扣
            .control
              input.input(
                type="number"
                v-model="coupon.percent"
              )
            label 到期日
            .control
              input.input(
                type="datetime-local"
                v-model="coupon.deadline_at"
              )
            label 啟用狀態
            .control
              input.switch(
                :class="{'is-success': coupon.enabled}"
                :id="coupon.id"
                type="checkbox"
                v-model="coupon.enabled"
              )
              label(
                :for="coupon.id"
              ) {{ checkEnabled(coupon.enabled) }}
      footer.modal-card-foot
        button.button.is-cus-primary(
          :class="{'is-loading': loading}"
          v-if="!coupon.id"
          data-action="create"
          type="button"
          @click.prevent="edit"
        ) 新增
        button.button.is-cus-primary(
          :class="{'is-loading': loading}"
          v-else
          data-action="update"
          type="button"
          @click.prevent="edit"
        ) 更新
        button.button(
          @click="cancel"
          type="button"
        ) 取消
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { createCuponData, updateCuponData } from '@/apis/backend';
import moment from 'moment';

export default {
  name: 'Coupon',
  computed: {
    ...mapGetters({
      coupon: 'coupon/coupon',
      loading: 'loading',
    }),
    title() {
      return !this.coupon.id ? '新增' : '更新';
    },
    checkEnabled() {
      return (enabled) => (enabled ? '啟用' : '未啟用');
    },
    check: {
      get() {
        return this.coupon.enabled;
      },
      set() {
        this.setEnabled();
      },
    },
  },
  methods: {
    ...mapActions({
      setMsg: 'setMsg',
      addCoupon: 'coupon/addCoupon',
      updateCoupon: 'coupon/updateCoupon',
      deleteCoupon: 'coupon/deleteCoupon',
      clearTempCoupon: 'coupon/clearTempCoupon',
      setEnabled: 'coupon/setEnabled',
      toggleLoading: 'toggleLoading',
      togglePage: 'togglePage',
    }),
    edit(e) {
      this.toggleLoading();
      const { action } = e.target.dataset;
      this.coupon.deadline_at = moment(this.coupon.deadline_at).format('yyyy-MM-DD hh:mm:ss');
      if (action === 'create') {
        createCuponData(this.coupon)
          .then((resp) => {
            if (resp.response.status === 200) {
              this.setMsg({
                msg: '優惠卷新增成功',
                type: true,
              });
              this.addCoupon(this.coupon);
              this.toggleLoading();
            }
          })
          .catch(() => {
            this.setMsg({
              msg: '優惠卷新增失敗',
              type: false,
            });
            this.toggleLoading();
          });
      } else {
        updateCuponData(this.coupon.id, this.coupon)
          .then((resp) => {
            if (resp.response.status === 200) {
              this.setMsg({
                msg: '優惠卷更新成功',
                type: true,
              });
              this.toggleLoading();
            }
          })
          .catch(() => {
            this.setMsg({
              msg: '優惠卷更新失敗',
              type: false,
            });
            this.toggleLoading();
          });
      }
    },
    cancel() {
      this.clearTempCoupon();
      this.togglePage();
    },
  },
  beforeDestroy() {
    this.clearTempCoupon();
  },
};
</script>
<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;900&display=swap')
.modal
  font-family: 'Noto Sans TC', sans serif
  position: fixed
</style>
