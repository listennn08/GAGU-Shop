<script setup lang="ts">
import _ from 'lodash'
import { useI18n } from 'vue-i18n'
import { InputText, Textarea, Select, AutoComplete } from 'primevue'
import { Form } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import { useCartStore } from '~/store/cartStore'
import { OrderService } from '~/services/domain/order'
import { OrderClient } from '~/services/infra'
import { useAppStore } from '~/store/appStore'
import { useOrderStore } from '~/store/orderStore'

const props = defineProps<{
  order: any
}>()

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
const route = useRoute()
const isInCheckout = computed(() => route.path.includes('checkout'))
const appStore = useAppStore()
const cartStore = useCartStore()
const orderStore = useOrderStore()

const discountStore = useDiscount()
const orderService = OrderService(OrderClient())

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
    paid: boolean
  }>
>({
  name: '',
  tel: '',
  email: '',
  address: '',
  remark: '',
  payment: '',
  paid: false,
})

watch(form, (newVal) => {
  console.log(newVal)
})

watch(
  () => props.order,
  (newVal) => {
    if (isInCheckout.value) return
    form.name = newVal.user.name
    form.tel = newVal.user.tel
    form.email = newVal.user.email
    form.address = newVal.user.address
    form.remark = newVal.remark
    form.payment = newVal.payment
    form.paid = newVal.paid
  },
  { immediate: true },
)

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

const isLoading = ref(false)
async function submitForm({ valid }: { valid: boolean }) {
  try {
    if (!valid) return
    isLoading.value = true
    if (discountStore.code) form.coupon = discountStore.code
    const resp = await orderService.createOrder(form as Required<typeof form>)
    navigateTo(`payflow/${resp.data.data.id}`)
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: t('toast.error'),
      detail: t('checkout.error-message'),
    })
  } finally {
    isLoading.value = false
  }
}

const paidStatus = computed(() =>
  orderStore.order.paid
    ? { status: 'text-green-500', msg: '已付款' }
    : { status: 'text-red-500', msg: '未付款' },
)

const isPaying = ref(false)
async function handleClickPay(id: string) {
  try {
    isPaying.value = true
    const resp = await orderService.payOrder(id)
    orderStore.setOrder(resp.data.data)
    toast.add({
      severity: 'success',
      summary: t('toast.success'),
      detail: t('checkout.pay-success'),
    })
    appStore.setCurrentStep(3)
    toast.add({
      severity: 'info',
      summary: t('toast.success'),
      detail: t('checkout.pay-success'),
    })
  } catch {
    toast.add({
      severity: 'error',
      summary: t('toast.error'),
      detail: t('checkout.pay-error'),
    })
  } finally {
    isPaying.value = false
  }
}
</script>

<template>
  <h4 class="text-lg font-bold border-b border-black border-solid mb-2">
    <i class="pi pi-info-circle" />
    <span>&nbsp; {{ $t('checkout.order-info') }}</span>
  </h4>
  <Form
    v-slot="$form"
    :resolver="resolver"
    class="flex flex-col gap-4 mb-4"
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
          :disabled="!isInCheckout"
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
    <div v-if="!isInCheckout">
      <p-ifta-label variant="over">
        <p-input-text
          :model-value="t(form.paid ? 'checkout.paid' : 'checkout.unpaid')"
          input-id="paid"
          name="paid"
          disabled
          :class="form.paid ? '!text-green-500' : '!text-red-500'"
          fluid
        />
        <label for="paid">
          {{ $t('checkout.payment-status') }}
        </label>
      </p-ifta-label>
    </div>

    <div class="text-center">
      <template v-if="isInCheckout">
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
      </template>
      <template v-else>
        <p-button @click="handleClickPay(order.id)" :loading="isPaying">
          {{ t('checkout.confirm-payment') }}
        </p-button>
      </template>
    </div>
  </Form>
</template>
