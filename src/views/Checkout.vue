<template lang="pug">
  section.hero-body
    .container
      .columns.is-centered.is-desktop
        .column.is-two-thirds
          Steps
          h4.h4t.has-text-left
            font-awesome-icon.titleIcon(:icon="['far', 'clipboard']")
            span &nbsp; 購物清單
          .preview-content.mt-1(
            :class="{show: isCollapse}"
          )
            .columns.is-marginless.has-text-centered.is-vcentered.is-desktop(
              v-for="( item, index ) in products"
              :key="index"
            )
              .column.is-paddingless.is-marginless.is-3.mobile
                .box.is-shadowless.py-1.px-2
                  .media
                    .media-left
                      figure.image.is-64x64.is-inline-block.mr-1
                        img(:src="item.product.imageUrl[0]")
                    .content
                      .is-5.has-text-weight-bold {{ item.product.title }}
                      p.is-marginless x{{ item.quantity }}
                      p.is-marginless {{ itemTotal(index) | cash }}
              .column.is-3.desktop
                figure.image.is-128x128.is-inline-block.mr-1
                  img(:src="item.product.imageUrl[0]")
              .column.desktop {{ item.product.title }}
              .column.is-1.is-marginless.is-paddingless.desktop x{{ item.quantity }}
              .column.is-1.mb-1.is-paddingless.desktop {{ itemTotal(index) | cash }}
          .buy-item.mt-1.mb-2(v-if="products.length > 2")
            button.collapse(
              :class="isCollapse? 'up' : 'down'"
              @click="toggleCollapse()"
            )
              font-awesome-icon(
                :icon="['fas', isCollapse?'angle-double-up':'angle-double-down']"
              )
          .field.has-addons.has-addons-right
            p.control
              input.input.desktop(
                type="text"
                placeholder="請輸入折扣碼"
                v-model="discount.code"
                @change="debounce(checkCoupon())"
              )
            p.control.mobile.is-expanded
              input.input.is-small.mobile(
                type="text"
                placeholder="請輸入折扣碼"
                v-model="discount.code"
                @change="debounce(checkCoupon())"
              )
            p.control
              label.button.is-static.desktop(:class="{'is-loading': isLoading}")
                font-awesome-icon(:icon="['fas', 'tags']")
              label.button.is-static.is-small.mobile(:class="{'is-loading': isLoading}")
                font-awesome-icon(:icon="['fas', 'tags']")
          div
            .has-text-right(v-if="discount.code")
              p(
                v-if="discount.code"
                :class="couponUseful"
              ) {{ discount.msg }}
          .subtitle.is-5.is-font-Noto.is-fullwidth
            .has-text-right 總額
              span {{ countAll | cash }}
          h4.h4t.has-text-left
            font-awesome-icon.titleIcon(:icon="['fas', 'info-circle']")
            span &nbsp; 訂單資訊

          validation-observer(
              v-slot="{ invalid }"
              @submit.prevent="submitForm()"
          )
            form
              .field
                  .field-label.has-text-left
                    label.label.is-normal(for="name") 姓名
                  .field-body
                    validation-provider(
                      name="姓名"
                      v-slot="{ errors, classes }"
                      rules="required"
                    ).field
                      p.control.has-icons-left.has-icons-right
                        span.icon.is-small.is-left
                          font-awesome-icon(:icon="['fas', 'user']")
                        input#name.input(
                          type="text"
                          v-model="form.name"
                          :class="classes"
                          required
                        )
                        span.icon.is-small.is-right
                          font-awesome-icon(:icon="['fas', checkedIcon(errors[0])]")
                        span.has-text-left.help.is-danger(
                          v-if="errors[0]"
                        ) {{ errors[0] }}
              .field
                .field-label.has-text-left
                  label.label(for="phone") 電話
                .field-body
                  validation-provider.field(
                    name="電話"
                    v-slot="{ errors, classes }"
                    rules="required|digits:10"
                  ).filed
                    p.control.has-icons-left.has-icons-right
                      span.icon.is-small.is-left
                        font-awesome-icon(:icon="['fas', 'phone-alt']")
                      input#phone.input(
                        type="tel"
                        v-model="form.tel"
                        :class="classes"
                        maxlength=10
                        required
                      )
                      span.icon.is-small.is-right
                        font-awesome-icon(:icon="['fas', checkedIcon(errors[0])]")
                      span.has-text-left.help.is-danger(
                        v-if="errors[0]"
                      ) {{ errors[0] }}

              .field
                .field-label.has-text-left
                  label.label(for="email") 信箱
                .field-body
                  validation-provider.field(
                    name="信箱"
                    v-slot="{ errors, classes }"
                    rules="required|email"
                  )
                    p.control.has-icons-left.has-icons-right
                      span.icon.is-small.is-left
                        font-awesome-icon(:icon="['fas', 'envelope']")
                      input#email.input(
                        type="email"
                        v-model="form.email"
                        :class="classes"
                        required
                      )
                      span.icon.is-small.is-right
                        font-awesome-icon(:icon="['fas', checkedIcon(errors[0])]")
                      span.has-text-left.help.is-danger(
                        v-if="errors[0]"
                      ) {{ errors[0] }}
              .field
                .field-label.has-text-left
                  label.label(for="address") 收件地址
                .field-body
                  validation-provider.field(
                    name="收件地址"
                    v-slot="{ errors, classes }"
                    rules="required"
                  )
                    p.control.has-icons-left.has-icons-right
                      span.icon.is-small.is-left
                        font-awesome-icon(:icon="['far', 'address-card']")
                      input#address.input(
                        type="text"
                        v-model="form.address"
                        :class="classes"
                        required)
                      span.icon.is-small.is-right
                        font-awesome-icon(:icon="['fas', checkedIcon(errors[0])]")
                      span.has-text-left.help.is-danger(
                        v-if="errors[0]"
                      ) {{ errors[0] }}

              .field
                .field-label.has-text-left
                  label.label(for="remark") 備註
                    small.has-text-grey-light （選填)
                .field-body
                  .field
                    p.control.has-icons-left.has-icons-right
                      textarea#remark.textarea(rows="5" v-model="form.remark")

              .field
                .field-label.has-text-left
                  label.label(for="paytype") 付款方式
                .field-body
                  validation-provider.field(
                    name="付款方式"
                    v-slot="{ errors, classes }"
                    rules="required"
                  )
                    .control.is-expended
                      .select.is-fullwidth(:class="classes")
                        select(
                          name="payment"
                          id="paytype"
                          v-model="form.payment"
                        )
                          option(value="" disabled) ---請選擇付款方式---
                          option(
                            v-for="(type, index) in payment"
                            :key="index"
                            :value="type"
                          ) {{ type }}
                      span.has-text-left.help.is-danger(
                        v-if="errors[0]"
                      ) {{ errors[0] }}

              .control.buttons.is-centered
                button.button.is-text(type="button" @click="$router.go(-1)") 上一頁
                button.button.is-primary(
                  :class="{'is-loading': loading}"
                ) 確認訂單
    vue-confirm-dialog
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import * as moment from 'moment';
import { getCart, checkCoupon, createOrder } from '@/apis/frontend';
import Steps from '@/components/Steps.vue';

export default {
  name: 'Checkout',
  components: {
    Steps,
  },
  data() {
    return {
      payment: ['WebATM', 'ATM', 'Barcode', 'Credit', 'ApplePay', 'GooglePay'],
      form: {
        name: '',
        tel: '',
        email: '',
        payment: '',
        address: '',
        remark: '',
      },
      discount: {
        code: '',
        percent: 0,
        msg: '',
        type: false,
      },
      isCollapse: false,
      collapse: false,
      isLoading: false,
    };
  },
  created() {
    this.getShopCartData();
    this.setCurrentStep(1);
  },
  computed: {
    ...mapGetters({
      products: 'shopcart/shopcartItems',
      loading: 'loading',
    }),
    countAll() {
      const total = this.products
        .reduce((cur, el) => cur + (el.quantity * (el.product.price
          ? el.product.price
          : el.product.origin_price)),
        0);
      return this.discount.percent
        ? total * (this.discount.percent / 100)
        : total;
    },
    itemTotal() {
      return (index) => (this.products[index].quantity * (this.products[index].product.onsale
        ? this.products[index].product.onsale
        : this.products[index].product.price));
    },
    checkedIcon() {
      return (error) => (error ? 'exclamation-triangle' : 'check');
    },
    couponUseful() {
      return (this.discount.type ? 'has-text-success' : 'has-text-danger');
    },
    couponMsg() {
      if (this.discount.code) {
        return (this.discount.type)
          ? `折扣${this.discount.percent}%`
          : '此優惠碼無效';
      }
      return '';
    },
  },
  watch: {
    'discount.percent': {
      handler() {
        return this.countAll && this.discountMsg;
      },
    },
  },
  methods: {
    ...mapActions({
      setProducts: 'shopcart/setShopcartItems',
      toggleLoading: 'toggleLoading',
      setMsg: 'setMsg',
      setCurrentStep: 'setCurrentStep',
    }),
    getShopCartData() {
      const loader = this.$loading.show({
        container: this.$refs.preivew,
        isFullPage: false,
      });
      getCart()
        .then((resp) => {
          this.setProducts(resp.data.data);
          loader.hide();
        });
    },
    submitForm() {
      this.toggleLoading();
      if (this.discount.code) {
        this.form.coupon = this.discount.code;
      }
      createOrder(this.form)
        .then((resp) => {
          this.toggleLoading();
          this.$router.push(`payflow/${resp.data.data.id}`);
        });
    },
    checkCoupon() {
      this.isLoading = true;
      checkCoupon(this.discount.code)
        .then((resp) => {
          if (moment(resp.data.data.deadline.datetime).isAfter(new Date())) {
            this.discount = {
              code: this.discount.code,
              percent: resp.data.data.percent,
              type: true,
              msg: `折扣${resp.data.data.percent}%`,
            };
            this.isLoading = false;
          } else {
            const msg = '酷碰卷已過期';
            this.setMsg({
              msg,
              type: false,
            });
            this.discount = {
              code: this.discount.code,
              percent: 0,
              type: false,
              msg,
            };
            this.isLoading = false;
          }
        })
        .catch((err) => {
          const msg = err.response.data.message;
          this.setMsg({
            msg,
            type: false,
          });
          this.discount = {
            code: this.discount.code,
            percent: 0,
            type: false,
            msg,
          };
          this.isLoading = false;
        });
    },
    debounce(func, delay = 100) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
      };
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>
<style lang="sass" scoped>
$darkgray: #CBD0D8
@mixin tablet
  @media screen and (min-width: 576px) and (max-width: 767px)
    @content
@mixin desktop
  @media screen and (min-width: 768px)
    @content
@mixin widescreen
  @media screen and (min-width: 993px)
    @content
@mixin xxs
  @media screen and (max-width: 375px)
    @content
@mixin mobile
  @media screen and (max-width: 768px)
    @content
@keyframes collapseAnimation
  0%
    transform: translateY(0)
  50%
    transform: translateY(10%)
  100%
    transform: translateY(20%)
@keyframes collpaseList
  0%
    height: 300px
  50%
    height: 400px
  100%
    height: auto

.has-cur-background-goldyellow
  background: rgba(211, 172, 43, .5)
  width: 34%
  padding: 1% 10%
  margin: 1% 33%
  background: rgba(211, 172, 43, .5)
  border: 1px dotted $darkgray
  border-radius: 20px
  font-font-family: 'Noto Sans TC', sans serif
  span
    display: inline-block
    margin-left: 5%
.preview-content
  max-height: 300px
  overflow-y: hidden
  +mobile
    max-height: 200px
    font-size: 14px
  &.show
    animation: collpaseList .5s 1 linear forwards
    max-height: 100%
.collapse
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
</style>
