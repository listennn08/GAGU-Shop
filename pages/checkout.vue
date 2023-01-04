<script lang="ts" setup>
import { Form, useForm } from 'vee-validate'
import { debounce } from 'lodash'
import dayjs from 'dayjs'
import { checkCoupon } from '~~/services/frontend'
import { useAppStore } from '~~/store/appStore'
import { useCartStore } from '~~/store/cartStore'
import { CartService } from '~~/services/domain/cart'
import { OrderService } from '~~/services/domain/order'
import { CartClient, OrderClient } from '~~/services/infra'

const { values, handleSubmit } = useForm({
  initialValues: {
    name: '',
    tel: '',
    email: '',
    payment: '',
    address: '',
    remark: '',
    coupon: '',
  },
})

const appStore = useAppStore()
const cartStore = useCartStore()
const cartService = CartService(CartClient())
const orderService = OrderService(OrderClient())
const payment = ['WebATM', 'ATM', 'Barcode', 'Credit', 'ApplePay', 'GooglePay']
const discount = reactive({
  code: '',
  percent: 0,
  msg: '',
  type: false,
})
const isLoading = ref(false)

const countAll = computed(() => {
  const total = cartStore.shopcartItems.reduce(
    (cur, el) => cur + el.quantity * (el.price ? el.price : el.origin_price),
    0,
  )
  return total * (discount.percent / 100 || 1)
})

const couponUseful = computed(() =>
  discount.type ? 'has-text-success' : 'has-text-danger',
)

const getShopCartData = async () => {
  // const loader = this.$loading.show({
  //   container: this.$refs.preivew,
  //   isFullPage: false,
  // });
  try {
    const resp = await cartService.getAllCartItems()
    cartStore.setShopcartItems(resp)
    // loader.hide();
  } catch (err) {
    console.log(err)
  }
}

const submitForm = handleSubmit(async (values) => {
  try {
    appStore.toggleLoading()
    if (discount.code) values.coupon = discount.code
    const resp = await orderService.createOrder(values)
    navigateTo(`payflow/${resp.data.data.id}`)
  } catch (err) {
    console.log(err)
  } finally {
    appStore.toggleLoading()
  }
})

const doCheckCoupon = async () => {
  // this.isLoading = true;
  try {
    const resp = await checkCoupon(discount.code)
    if (dayjs(resp.data.data.deadline.datetime).isAfter(new Date())) {
      discount.percent = resp.data.data.percent
      discount.type = true
      discount.msg = `折扣${resp.data.data.percent}%`
      isLoading.value = false
    } else {
      const msg = '酷碰卷已過期'
      // this.setMsg({
      //   msg,
      //   type: false,
      // });
      discount.percent = 0
      discount.type = false
      discount.msg = msg
      isLoading.value = false
    }
  } catch (err: any) {
    const msg = err.response.data.message
    // this.setMsg({
    //   msg,
    //   type: false,
    // });
    discount.percent = 0
    discount.type = false
    discount.msg = msg
    // this.isLoading = false;
  }
}
</script>

<template>
  <section class="hero-body">
    <div class="container">
      <div class="columns is-centered is-desktop">
        <div class="column is-two-thirds">
          <steps />
          <shop-list :products="cartStore.shopcartItems" />
          <div class="field has-addons has-addons-right">
            <p class="control">
              <input
                class="input desktop"
                type="text"
                placeholder="請輸入折扣碼"
                v-model="discount.code"
                @change="debounce(doCheckCoupon, 500)"
              />
            </p>
            <p class="control mobile is-expanded">
              <input
                class="input is-small mobile"
                type="text"
                placeholder="請輸入折扣碼"
                v-model="discount.code"
                @change="debounce(doCheckCoupon, 500)"
              />
            </p>
            <p class="control">
              <label
                class="button is-static desktop"
                :class="{ 'is-loading': isLoading }"
              >
                <i class="i-fa-solid-tags" />
              </label>
              <label
                class="button is-static is-small mobile"
                :class="{ 'is-loading': isLoading }"
              >
                <i class="i-fa-solid-tags" />
              </label>
            </p>
          </div>
          <div>
            <div class="has-text-right" v-if="discount.code">
              <p v-if="discount.code" :class="couponUseful">
                {{ discount.msg }}
              </p>
            </div>
          </div>
          <div class="subtitle is-5 is-font-Noto is-fullwidth">
            <div class="has-text-right">
              總額
              <span>{{ toCash(countAll) }}</span>
            </div>
          </div>
          <h4 class="h4t has-text-left">
            <i class="icon i-fa-solid-info-circle" />
            <span>&nbsp; 訂單資訊</span>
          </h4>
          <Form as="div">
            <form @submit="submitForm">
              <Field
                rules="required"
                label="姓名"
                name="name"
                v-model="values.name"
                left-icon="i-fa-solid-user"
              />
              <Field
                rules="required|digits:10"
                label="電話"
                name="tel"
                v-model="values.tel"
                left-icon="i-fa-solid-phone-alt"
              />
              <Field
                rules="required|email"
                label="信箱"
                name="email"
                v-model="values.email"
                left-icon="i-fa-solid-envelope"
              />
              <Field
                rules="required"
                label="收件地址"
                name="address"
                v-model="values.address"
                left-icon="i-fa-regular-address-card"
              />
              <Field
                label="備註"
                name="remark"
                v-model="values.remark"
                type="textarea"
              />
              <Field
                rules="required"
                label="付款方式"
                name="payment"
                v-model="values.payment"
                type="select"
                :options="payment"
              />
              <div class="control buttons is-centered">
                <button
                  class="button is-text"
                  type="button"
                  @click="$router.go(-1)"
                >
                  上一頁
                </button>
                <button
                  class="button is-primary"
                  :class="{ 'is-loading': appStore.loading }"
                >
                  確認訂單
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  </section>
  <!-- <vue-confirm-dialog /> -->
</template>

<style scoped></style>
