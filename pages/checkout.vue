<script lang="ts" setup>
import _ from 'lodash'
import { InputText, Textarea, Select, AutoComplete } from 'primevue'
import { Form } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import { useI18n } from 'vue-i18n'

import { OrderService } from '~~/services/domain/order'
import { OrderClient } from '~~/services/infra'
import { useCartStore } from '~/store/cartStore'

const PAYMENT_METHODS = [
  'WebATM',
  'ATM',
  'Barcode',
  'Credit',
  'ApplePay',
  'GooglePay',
] as const

const { t } = useI18n()
const toast = useToast()
const {
  shopCartItems: products,
  loading,
  countAll,
} = storeToRefs(useCartStore())
const resolver = zodResolver(
  z.object({
    name: z
      .string({ message: t('form-validation.name-required') })
      .min(1, { message: t('form-validation.name-required') }),
    tel: z
      .string({ message: t('form-validation.tel-required') })
      .min(10, { message: t('form-validation.tel-length') })
      .max(10, { message: t('form-validation.tel-length') }),
    email: z
      .string({ message: t('form-validation.email-required') })
      .min(1, { message: t('form-validation.email-required') })
      .email({ message: t('form-validation.email-invalid') }),
    address: z
      .string({ message: t('form-validation.address-required') })
      .min(1, { message: t('form-validation.address-required') }),
    remark: z.string().nullable().optional(),
    payment: z.enum(PAYMENT_METHODS, {
      message: t('form-validation.payment-required'),
    }),
  }),
)
const form = reactive<
  Partial<{
    name: string
    tel: string
    email: string
    address: string
    remark: string
    coupon: string
    payment: string
  }>
>({
  name: '',
  tel: '',
  email: '',
  address: '',
  remark: '',
  payment: '',
})
const mailRecommend = ref<string[]>([])
const formElements = computed(() => [
  {
    is: InputText,
    label: 'checkout.name',
    name: 'name',
    type: 'text',
    placeholder: 'checkout.name-placeholder',
  },
  {
    is: InputText,
    label: 'checkout.tel',
    name: 'tel',
    type: 'tel',
    placeholder: 'checkout.tel-placeholder',
  },
  {
    is: AutoComplete,
    label: 'checkout.email',
    name: 'email',
    type: 'email',
    placeholder: 'checkout.email-placeholder',
    suggestions: mailRecommend.value,
    onComplete: (e: any) => {
      const [mail, suffix] = e.query.split('@')
      const MAIL_SUFFIX = [
        'gmail.com',
        'yahoo.com',
        'hotmail.com',
        'outlook.com',
        'msn.com',
        'live.com',
        'live.com',
      ]
      if (mail && suffix) {
        mailRecommend.value = MAIL_SUFFIX.filter((suffix) =>
          RegExp(_.escapeRegExp(suffix)).test(suffix),
        )
      } else {
        mailRecommend.value = MAIL_SUFFIX.map((suffix) => `${mail}@${suffix}`)
      }
    },
  },
  {
    is: InputText,
    label: 'checkout.address',
    name: 'address',
    type: 'text',
    placeholder: 'checkout.address-placeholder',
  },
  {
    is: Textarea,
    label: 'checkout.remark',
    name: 'remark',
    placeholder: 'checkout.remark-placeholder',
  },
  {
    is: Select,
    label: 'checkout.payment',
    name: 'payment',
    placeholder: 'checkout.payment-placeholder',
    options: PAYMENT_METHODS,
  },
])

const cartStore = useCartStore()
const discountStore = useDiscount()
const { discountPercent, discountType, discountMsg } =
  storeToRefs(discountStore)
const orderService = OrderService(OrderClient())

const isLoading = ref(false)

const couponUseful = computed(() =>
  discountType.value ? 'has-text-success' : 'has-text-danger',
)

async function submitForm() {
  try {
    isLoading.value = true
    if (discountStore.code) form.coupon = discountStore.code
    const resp = await orderService.createOrder(form as Required<typeof form>)
    navigateTo(`payflow/${resp.data.data.id}`)
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: t('checkout.error'),
      detail: t('checkout.error-message'),
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="max-w-screen-md mx-auto">
    <steps />
    <shop-list :products="products" :loading="loading" :count-all="countAll" />
    <div class="flex justify-end">
      <p-input-group class="!md:w-1/3">
        <p-input-group-addon>
          <i class="pi pi-tag" />
        </p-input-group-addon>
        <p-input-text
          v-model="discountStore.code"
          :placeholder="$t('checkout.coupon-placeholder')"
        />
        <p-input-group-addon>
          <p-button variant="text" @click="discountStore.handleCheckCoupon">
            Apply
          </p-button>
        </p-input-group-addon>
      </p-input-group>
    </div>
    <div>
      <div class="has-text-right" v-if="discountStore.code">
        <p v-if="discountStore.code" :class="couponUseful">
          {{ discountStore.discountMsg }}
        </p>
      </div>
    </div>
    <h4 class="text-lg font-bold border-b border-black border-solid mb-2">
      <i class="pi pi-info-circle" />
      <span>&nbsp; {{ $t('checkout.order-info') }}</span>
    </h4>
    <Form
      v-slot="$form"
      :resolver="resolver"
      class="flex flex-col gap-4"
      @submit="submitForm"
    >
      <div v-for="element in formElements" :key="element.name">
        <p-ifta-label variant="over" :invalid="$form[element.name]?.invalid">
          <component
            :is="element.is"
            v-model="form[element.name as keyof typeof form]"
            :input-id="element.name"
            :type="element.type"
            :name="element.name"
            :options="element.options"
            :suggestions="element.suggestions"
            @complete="element.onComplete"
            fluid
          />
          <label :for="element.name">
            {{ $t(element.label) }}
          </label>
        </p-ifta-label>
        <p-message
          v-if="$form[element.name]?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form[element.name].error.message }}
        </p-message>
      </div>

      <div class="text-center">
        <p-button
          variant="text"
          type="button"
          :label="$t('checkout.back')"
          :disabled="isLoading"
          @click="$router.go(-1)"
        />
        <p-button
          :label="$t('checkout.confirm-order')"
          :disabled="isLoading || cartStore.shopCartItems.length === 0"
          type="submit"
        />
      </div>
    </Form>
  </section>
  <!-- <vue-confirm-dialog /> -->
</template>

<style scoped></style>
